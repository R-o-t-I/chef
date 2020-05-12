import React from 'react';
import {
	Panel,
	PanelHeader,
    Group,
    Placeholder
} from '@vkontakte/vkui';

import Icon28NotificationDisableOutline from '@vkontakte/icons/dist/28/notification_disable_outline';

class Notifications extends React.Component {
    constructor (props) {
      super(props);

      this.state = {};
    }

render () {
	const {
		id
	} = this.props;

	return (
    <Panel id={id} separator={true}>
        <PanelHeader>
            Уведомления
        </PanelHeader>
        <Group>
            <Placeholder
                icon={<Icon28NotificationDisableOutline width={80} height={80} />}
                stretched
            >
                У Вас нет уведомлений
          </Placeholder>
        </Group>
    </Panel>
		);
	}
}

export default Notifications;