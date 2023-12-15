import React, { useRef, useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Form.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    props.onChange(props.id, pickedFile);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div>
        <div>
          {previewURL ? (
            <img src={previewURL} alt="Preview" />
          ) : (
            <div style={{display:"flex", alignItems:"baseline", paddingLeft:"2rem"}}>
              <p>Please pick an image.</p>
              <Button
                type="button"
                className="upload-button"
                onClick={pickImageHandler}
              >
                <Icon name="upload" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
