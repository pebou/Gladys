import { Component } from 'preact';
import { connect } from 'unistore/preact';
import Select from 'react-select';
import { Text } from 'preact-i18n';

const ACTION_LIST = ['light.turn-on', 'delay', 'message.send'];

@connect('httpClient', {})
class ChooseActionType extends Component {
  state = {
    currentAction: null
  };
  handleChange = selectedOption => {
    this.setState({
      currentAction: selectedOption
    });
  };
  changeBoxType = () => {
    if (this.state.currentAction) {
      this.props.updateActionProperty(this.props.columnIndex, this.props.index, 'type', this.state.currentAction.value);
    }
  };
  render(props, { currentAction }) {
    return (
      <div>
        <div class="form-group">
          <label class="form-label">
            <Text id="editScene.selectActionType" />
          </label>
          <Select
            onChange={this.handleChange}
            value={currentAction}
            options={ACTION_LIST.map(action => ({
              value: action,
              label: <Text id={`editScene.actions.${action}`} />
            }))}
          />
        </div>
        <div class="form-group">
          <button onClick={this.changeBoxType} class="btn btn-success">
            <Text id="editScene.addActionButton" />
          </button>
        </div>
      </div>
    );
  }
}

export default ChooseActionType;
