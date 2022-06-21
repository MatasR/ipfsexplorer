import { useState } from 'react';
import { create } from 'ipfs-http-client';

function Home() {
  const [uploading, setUploading] = useState(0);
  const [uploadedFileHash, setUploadedFileHash] = useState(0);

  // Entering file hash to view it
  function handleHashChange(event) {
    let hash = event.target.value;

    if(hash.length === 46)
      window.open('/ipfs/'+hash);
  }

  // Uploading new file
  function handleFileUpload(event) {
    setUploading(1);

    // Extract binary array (buffer) from the file and set it to state variable
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);

    reader.onloadend = async () => {
      const fileBuffer = Buffer(reader.result);

      // Load ipfs gateway
      const ipfs = create('https://ipfs.infura.io:5001');
      // Upload file to ipfs
      const uploadedFile = await ipfs.add(fileBuffer);
      // Get its hash
      const fileHash = uploadedFile.path;

      // Send hash to backend
      axios.post('/api/file', {
        hash: fileHash
      });

      setUploadedFileHash(fileHash);
      setUploading(2);
    }
  }

  return (
    <div className="container col-lg-5 col-md-6">
      <header className="text-white rounded p-3 my-3" style={{ backgroundColor: '#6f42c1' }}>
        <h1>IPFS Explorer</h1>
        <p className="m-0">Upload, View, Explore files in IPFS network</p>
      </header>

      <section id="view" className="my-3 p-3 bg-white rounded shadow-sm">
        <h3>View</h3>
        <label className="form-label">Enter file hash to view it:</label><br/>
        <input className="form-control" type="text" onChange={handleHashChange} />
      </section>

      <section id="upload" className="my-3 p-3 bg-white rounded shadow-sm">
        <h3>Upload</h3>
        {uploading === 1 &&
          <>Uploading...</>
        }
        {!uploading &&
          <>
            <label className="form-label">Choose file to upload to IPFS network</label><br/>
            <input className="form-control" type="file" onChange={handleFileUpload} />
          </>
        }
        {uploading === 2 &&
          <p className="mb-0">
            Your uploaded file hash: <b>{uploadedFileHash}</b><br/>
            <button className="btn btn-secondary mt-2" onClick={() => setUploading(0)}>Retry</button>
          </p>
        }
      </section>
    </div>
  );
}
export default Home;
