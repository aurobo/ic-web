import _ from 'lodash';
import React from 'react';
import ControlPanel from '@innovic/components/shared/ControlPanel';
import { api } from '@innovic/components/shared/Utilities';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import FileInput from '@innovic/components/shared/FileInput';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import XLSX from 'xlsx';

class ImportExcel extends React.Component {
  state = {
    showError: false,
    loading: false,
  };

  onFileSelected = file => {
    this.setState({ showError: false, loading: true });

    var rABS = false;
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });

      /* DO SOMETHING WITH workbook HERE */
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);

    // var data = file;
    // //data = new Uint8Array(data);
    // var workbook = XLSX.read(data, { type: 'binary' });
    // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // var jsonData = XLSX.utils.sheet_to_json(first_worksheet);
    //let workbook = XLSX.readFile(file.name);
    // const formData = new FormData();

    // formData.append('file', file);

    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   onDownloadProgress: progressEvent => this.setState({ loading: false }),
    // };

    // api
    //   .post(this.props.uri, formData, config)
    //   .then(response => {
    //     this.props.history.push(this.props.redirectUri);
    //   })
    //   .catch(error => {
    //     if (error.response && _.isArray(error.response.data)) {
    //       this.setState({ showError: true, errors: error.response.data });
    //     } else {
    //       this.setState({ showError: true, errors: ['Something Went Wrong. Inform Admin.'] });
    //     }
    //   });
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
                <Message.Header>Fix these issues in your Excel File</Message.Header>
                <Message.List>
                  {_.map(this.state.errors, error => <Message.Item key={error}>{error}</Message.Item>)}
                </Message.List>
              </Message.Content>
            </Message>
          </Segment>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withRouter(ImportExcel);
