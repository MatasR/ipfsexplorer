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
    }
  }

  if(loading)
    return (<>Loading...</>);
  else{
    // return (<object data={fileURL} type={fileType} style={{ display: 'block', width: '100%', minHeight: '100%' }} />);
    return (<object data={fileURL} type={fileType} />);
  }
}
export default File;
