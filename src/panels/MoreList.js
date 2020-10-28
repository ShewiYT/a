import React from 'react';
import PropTypes from 'prop-types';
import connect from '@vkontakte/vkui-connect';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';
import Icon16Fire from "@vkontakte/icons/dist/16/fire";
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Market from '@vkontakte/icons/dist/24/market';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon24Bug from '@vkontakte/icons/dist/24/bug';
import Icon24Pin from '@vkontakte/icons/dist/24/pin';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28AirplayVideoOutline from '@vkontakte/icons/dist/28/airplay_video_outline';
import Icon24SkipNext from '@vkontakte/icons/dist/24/skip_next';
import Icon28Video from '@vkontakte/icons/dist/28/video';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon24Send from '@vkontakte/icons/dist/24/send';
import Icon24Game from '@vkontakte/icons/dist/24/game';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon28BombOutline from '@vkontakte/icons/dist/28/bomb_outline';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/settings';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import Icon28PollSquareOutline from '@vkontakte/icons/dist/28/poll_square_outline';
import { Panel, Button, Group, Tabs, TabsItem, Div, PanelHeaderBack, Avatar, Separator, PanelHeader, Footer, Search, CardGrid, Card, List, Cell, Header, Tooltip, FormStatus, FixedLayout, Epic, Tabbar, TabbarItem, Banner } from '@vkontakte/vkui';
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28CompassOutline from '@vkontakte/icons/dist/28/compass_outline';
import Icon28DevicesOutline from '@vkontakte/icons/dist/28/devices_outline';
import Icon28ArchiveOutline from '@vkontakte/icons/dist/28/archive_outline';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28LinkOutline from '@vkontakte/icons/dist/28/link_outline';
import Icon28AirplayAudioOutline from '@vkontakte/icons/dist/28/airplay_audio_outline';
import Icon24ScanViewfinderOutline from '@vkontakte/icons/dist/24/scan_viewfinder_outline';
import Icon28GhostOutline from '@vkontakte/icons/dist/28/ghost_outline';
import Icon24NarrativeFilled from '@vkontakte/icons/dist/24/narrative_filled';
import Icon12OnlineMobile from '@vkontakte/icons/dist/12/online_mobile';
import Icon28SafariOutline from '@vkontakte/icons/dist/28/safari_outline';
import Icon24NarrativeActiveOutline from '@vkontakte/icons/dist/24/narrative_active_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon24UserAddedOutline from '@vkontakte/icons/dist/24/user_added_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
const MoreList = props => (
  <Panel id={props.id}>
  <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
Другое
  </PanelHeader>  
    <Group header={<Header mode="secondary">Бонусы</Header>}>
      <Banner
                       before={<Avatar size={40}> <Icon28CameraOutline /> </Avatar> }

        header="Бонусная реклама"
        subheader={`Вы получите бонус после просмотра.`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.bonus}>Смотреть</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Задания"
        subheader={`Выполняй задания и получай коины.`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce"onClick={props.go} data-to="missions">Перейти</Button>
            
          </React.Fragment>
        }
      />

</Group>
<Group header={<Header mode="secondary">Другое</Header>}>
		<Banner
                       before={<Avatar size={40}> <Icon28GiftOutline /> </Avatar> }

        header="Контейнер"
        subheader={`Контейнеры покупаются за опыт в магазине.`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.modal} data-to="openContainer">Открыть</Button>
            
          </React.Fragment>
        }
      />
      <Banner
                       before={<Avatar size={40}> <Icon28MoneyCircleOutline /> </Avatar> }

        header="Промокод"
        subheader={`Вводи промокоды и становись богатым.`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.modal} data-to="promo">Ввести</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon24Privacy /> </Avatar> }

        header="Босс"
        subheader={`В разработке.`}
       
        actions={
          <React.Fragment>          <br/> 

            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28GameOutline /> </Avatar> }

        header="Казино"
        subheader={`Стань богатым или проиграй всё. [В разработке]`}
       
        actions={
          <React.Fragment>          <br/> 

            
          </React.Fragment>
        }
      />
</Group>
  </Panel>
);

MoreList.propTypes = {
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
export default MoreList;
