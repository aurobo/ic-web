import React from 'react';
import styled from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

const HiddenInput = styled.input`
  display: none;
`;

const StyledLabel = styled(Label)`
  &&& {
    cursor: pointer;
    border-radius: 0;
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.25);
    transition: color 0.2s ease;
  }
`;

class FileInput extends React.Component {
  state = {
    fileName: 'Choose from Computer',
  };

  handleFiles = event => {
    this.setState({ fileName: 'Choose from Computer' });

    var fileList = this.fileInput.files;

    if (fileList[0]) {
      this.setState({ fileName: fileList[0].name });
      this.props.onFileSelected(fileList[0]);
    }
  };

  componentDidMount() {
    this.fileInput.addEventListener('change', this.handleFiles, false);
  }

  render() {
    return (
      <StyledLabel size="large" as="label">
        <Icon name="upload" /> {this.state.fileName}
        <HiddenInput
          type="file"
          innerRef={input => {
            this.fileInput = input;
          }}
        />
      </StyledLabel>
    );
  }
}

export default FileInput;
