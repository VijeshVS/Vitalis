import subprocess
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import ipfshttpclient
import os
from io import BytesIO

# Initialize FastAPI app and IPFS client
app = FastAPI()
client = ipfshttpclient.connect()

# Start IPFS Daemon if not running (uncomment to start automatically)
# start_ipfs_daemon()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Uploads a file to IPFS and returns the content address (CID).
    """
    try:
        # Read file content
        content = await file.read()

        # Save the file temporarily
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, 'wb') as f:
            f.write(content)

        # Add file to IPFS
        result = client.add(temp_file_path)
        cid = result['Hash']

        # Clean up the temporary file
        os.remove(temp_file_path)

        return {"cid": cid}
    except Exception as e:
        return {"error": f"An error occurred while uploading the file: {str(e)}"}

@app.get("/file/{cid}")
async def retrieve_file(cid: str):
    """
    Retrieves a file from IPFS by CID and returns it.
    """
    try:
        # Retrieve the file from IPFS
        file_data = client.cat(cid)

        # Convert file data into a BytesIO object
        file_like = BytesIO(file_data)

        # Return the file as a response
        return FileResponse(file_like, media_type="application/octet-stream", filename=cid)
    except Exception as e:
        return {"error": f"An error occurred while retrieving the file: {str(e)}"}

# To run the FastAPI app:
# uvicorn main:app --reload
