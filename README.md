# React File Upload Component

This repository contains a React component that enables file uploading to a server. The component uses `axios` to send files to the server and provides feedback to the user about the upload status.

## Features

- **File Upload**: Upload a file to a server.
- **Upload Progress**: Displays a loading state during the upload.
- **Error Handling**: Provides error messages if the upload fails.
- **File Preview**: Shows a preview of the uploaded file.

## Prerequisites

- **React**: Ensure you have a React environment set up.
- **axios**: Used for making HTTP requests.

### Installation

First, make sure you have `axios` installed:

```bash
npm install axios
```bash





## Code Overview

```typescript
"use client";

import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(
        "https://cloudinary-upload-server-psi.vercel.app/api/v1/fileuploader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "123456789",
          },
        }
      );

      setFileUrl(response.data.fileUrl);
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <img
            src={fileUrl}
            alt="Uploaded File"
            style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;


##How It Works
- **File Selection: The user selects a file using the file input.
- **Upload Process: The file is sent to the server using axios. The uploading state is used to manage the loading state.
- **Response Handling: If the upload is successful, the component displays the uploaded file's URL as a preview. If it fails, an error message is shown.
- **Clean Up: After the upload is complete (success or failure), the component resets the states as necessary.

##License
This project is open-source and available under the MIT License.