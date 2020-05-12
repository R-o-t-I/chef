import React from 'react';
import {
	Panel,
	PanelHeader,
    Group
} from '@vkontakte/vkui';


class Blog extends React.Component {
    constructor (props) {
      super(props);

      this.state = {};
    }

render () {
	const {
        id,
        go
	} = this.props;

	return (
    <Panel id={id} separator={true}>
        <PanelHeader>Блог</PanelHeader>
        <Group>
        </Group>
    </Panel>
		);
	}
}

export default Blog;