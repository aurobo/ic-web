import React from "react";
import ControlPanel from "../../common/ControlPanel";
import { api } from "../../common/Utilities";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import FileInput from "../../common/FileInput";

class ImportExcel extends React.Component {
  state = {
    showError: false
  };

  onFileSelected = file => {
    this.setState({ showError: false });
    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    api
      .post("/salesorders/upload", formData, config)
      .then(response => {
        this.props.history.push("/sales/sales-orders");
      })
      .catch(error => {
        this.setState({ showError: true });
      });
  };

  render() {
    return (
      <div>
        <ControlPanel title="Import Excel">
          <FileInput onFileSelected={this.onFileSelected} />
        </ControlPanel>
        {this.state.showError ? (
          <Segment>
            <Message
              negative
              icon="meh"
              header="Something went wrong."
              content="Please check your file and upload again."
            />
          </Segment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ImportExcel;
