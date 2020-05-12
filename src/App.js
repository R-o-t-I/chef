import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	Epic,
	Tabbar,
	TabbarItem
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './panels/styles.css';
import Home from './panels/Home';
import Blog from './panels/Blog';
import Add from './panels/Add';
import Notifications from './panels/Notifications';
import Profile from './panels/Profile';

import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon28ListAddOutline from '@vkontakte/icons/dist/28/list_add_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';

const App = () => {
	const [active, setActive] = useState({
        story: 'home',
        panel: 'home'
    });
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(/*<ScreenSpinner size='large' />*/);
	const [showTab, setShowTab] = useState(true);
	
	const updateHistory = (s, p) => {
        window.history.pushState({ story: s, panel: p }, `${s}/${p}`);
    };

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const onTab = (param) => {
        setShowTab(param);
    };

	const go = (e) => {
        setActive({
            story: active.story,
            panel: e.currentTarget.dataset.to
        });

        updateHistory(active.story, e.currentTarget.dataset.to);
    };

	const onStoryChange = (e) => {
        if (e.currentTarget.dataset.story !== active.story) {
            const id = e.currentTarget.dataset.story;
            setActive({
                story: id,
                panel: id
            });

        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

		return (
			<Epic 
				activeStory={active.story}
				tabbar={
					showTab && (
						<Tabbar>
							<TabbarItem
								onClick={onStoryChange}
								selected={active.story === 'home'}
								data-story="home"
								text="Рецепты"
							>
								<Icon28ListOutline />
							</TabbarItem>

							<TabbarItem
								onClick={onStoryChange}
								selected={active.story === 'blog'}
								data-story="blog"
								text="Блог"
							>
								<Icon24Newsfeed width={28} height={28} />
							</TabbarItem>

							<TabbarItem
								onClick={onStoryChange}
								selected={active.story === 'add'}
								data-story="add"
								text="Добавить"
							>
								<Icon28ListAddOutline />
							</TabbarItem>
							
							<TabbarItem
								onClick={onStoryChange}
								selected={active.story === 'notifications'}
								data-story="notifications"
								text="Уведомления"
							>
								<Icon28Notifications />
							</TabbarItem>

							<TabbarItem
								onClick={onStoryChange}
								selected={active.story === 'profile'}
								data-story="profile"
								text="Профиль"
							>
								<Icon28Profile />
							</TabbarItem>
						</Tabbar>
					)
				}
			>
				<View
					id="home"
					activePanel={active.panel}
					popout={popout}
				>
					<Home 
						id='home'
						go={go}
					/>
				</View>

				<View
					id="blog"
					activePanel={active.panel}
					popout={popout}
				>
					<Blog 
						id='blog'
						go={go}
					/>
				</View>

				<View
					id="add"
					activePanel={active.panel}
				>
					<Add
						id='add'
						go={go}
					/>
				</View>
				
				<View
					id="notifications"
					activePanel={active.panel}
				>
					<Notifications
						id='notifications'
						go={go}
					/>
				</View>

				<View
					id="profile"
					activePanel={active.panel}
				>
					<Profile
						id='profile'
						fetchedUser={fetchedUser}
						go={go}
					/>
				</View>
			</Epic>
		);
}

export default App;