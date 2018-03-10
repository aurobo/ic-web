import _ from "lodash";
import React from "react";
import ControlPanel from "../../common/ControlPanel";
import { api } from "../../common/Utilities";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import FileInput from "../../common/FileInput";
import { Icon } from "semantic-ui-react";

class ImportExcel extends React.Component {
  state = {
    showError: false,
    loading: false
  };

  onFileSelected = file => {
    this.setState({ showError: false, loading: true });

    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      onDownloadProgress: progressEvent => this.setState({ loading: false })
    };

    api
      .post("/salesorders/upload", formData, config)
      .then(response => {
        this.props.history.push("/sales/sales-orders");
      })
      .catch(error => {
        this.setState({ showError: true, errors: error.response.data });
      });
  };

  render() {
    return (
      <div>
        <ControlPanel title="Import Excel" loading={this.state.loading}>
          <FileInput onFileSelected={this.onFileSelected} />
        </ControlPanel>
        {this.state.showError ? (
          <Segment>
            <Message negative icon>
              <Icon name="meh" />
              <Message.Content>
                <Message.Header>
                  Fix these issues in your Excel File
                </Message.Header>
                <Message.List>
                  {_.map(this.state.errors, error => (
                    <Message.Item key={error}>{error}</Message.Item>
                  ))}
                </Message.List>
              </Message.Content>
            </Message>
          </Segment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ImportExcel;
