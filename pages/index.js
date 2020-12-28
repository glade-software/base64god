import React, {useCallback, useState} from 'react'
import copy from 'copy-to-clipboard';
import {useDropzone} from 'react-dropzone'
import Head from '../components/head';

const Home = () => {
    const [base64, setBase64] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = _ => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
      <Head title="Base64 God" />
      <div id="zone" {...getRootProps()}>
        <input {...getInputProps()}/>
        {
          isDragActive ?
            <p>Drop a file to get a base64 URL</p> :
            <p>Drop a file to get a base64 URL, or just click here to pick one</p>
        }
      </div>
      {base64 ?
        <div>
          <button id="copy-button" onClick={_=>{
              copy(base64);
              setBase64(null);
          }}>
            copy to clipboard
          </button>
        </div> : null
      }

      <style jsx>{`
        #zone {
          display: flex;
          flex: 1;
          justify-content: flex;
          border: 3px solid #1A535C;
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export default Home;
