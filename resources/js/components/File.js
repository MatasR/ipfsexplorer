import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { fileTypeFromBlob } from 'file-type';

function File() {
  const [loading, setLoading] = useState(1);
  const [fileURL, setFileURL] = useState();
  const [fileType, setFileType] = useState();

  const CID = useParams().cid;

  useEffect(() => {
    // Send hash to backend
    axios.post('/api/view', {
      hash: CID
    });

    previewFile();
  }, []);

  async function previewFile() {
    // CIDv1
    if(CID.substr(0, 4) == 'bafy'){

      const url = 'https://'+CID+'.ipfs.infura-ipfs.io';

      setFileURL(url);
      setLoading(0);

      // Send success status to backend
      axios.post('/api/view', {
        hash: CID,
        loaded: 1
      });
    }

    // CIDv0
    if(CID.length === 46){
      const ipfs = create('https://ipfs.infura.io:5001');

      const chunks = [];
      for await (const chunk of ipfs.cat(CID))
        chunks.push(chunk);

      let blob = new Blob(chunks);
      let fileType = await fileTypeFromBlob(blob);
      // Txt files have no mime, we need to assign it by our selves
      fileType = fileType ?? { mime:'text/plain' };

      let blobWithType = new Blob(chunks, { type: fileType.mime });

      const reader = new FileReader();

      reader.readAsDataURL(blobWithType);
      reader.onload = function(){
        setFileURL(reader.result);
      }

      setFileType(fileType.mime);
      setLoading(0);

      // Send success status to backend
      axios.post('/api/view', {
        hash: CID,
        loaded: 1
      });
    }
  }

  if(loading)
    return (<>Loading...</>);
  else{
    if(fileType == null)
      return (<object data={fileURL} style={{ display: 'block', width: '100%', minHeight: '100%' }} />);
    else {
      if(fileType.split('/')[0] == 'image')
        return (<object data={fileURL} type={fileType} style={{ display: 'block' }} />);
      else if(fileType.split('/')[1] == 'pdf')
        return (<object data={fileURL} type={fileType} style={{ display: 'block', width: '100%', minHeight: '100%' }} />);
      else
        return (<object data={fileURL} type={fileType} style={{ display: 'block', width: '100%', minHeight: '100%' }} />);
    }
  }
}
export default File;
