import React from 'react';
import PropTypes from 'prop-types';
import {
	Panel,
	PanelHeader,
	Group,
	Cell,
	Avatar
} from '@vkontakte/vkui';

class Profile extends React.Component {
	constructor (props) {
		super(props);
  
		this.state = {};
	  }

	render() {
        const {
            id,
			fetchedUser,
			go
		} = this.props;
        return (
			<Panel id={id}>
				<PanelHeader>Профиль</PanelHeader>
				{fetchedUser &&
				<Group>
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
						description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>}
			</Panel>
		);
	}
}

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Profile;