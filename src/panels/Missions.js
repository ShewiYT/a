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
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
import Icon28CheckShieldOutline from '@vkontakte/icons/dist/28/check_shield_outline';
const Missions = props => (
  <Panel id={props.id}>
  <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
Задания
  </PanelHeader>  
    <Group header={<Header mode="secondary">Обычные</Header>}>
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Новичок"
        subheader={`${props.allclick}/1.500 Кликов. +4.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss1}>Выполнить</Button>
            
          </React.Fragment>
        }
      />
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Просто люблю кликать"
        subheader={`${props.allclick}/5.000 Кликов. +7.500 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss2}>Выполнить</Button>
            
          </React.Fragment>
        }
      />
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Первая десяточка"
        subheader={`${props.allclick}/10.000 Кликов. +15.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss3}>Выполнить</Button>
            
          </React.Fragment>
        }
      />
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Пора бы отдохнуть..."
        subheader={`${props.allclick}/20.000 Кликов. +25.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss4}>Выполнить</Button>
            
          </React.Fragment>
        }
      />
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Бесконечность не предел"
        subheader={`${props.allclick}/50.000 Кликов. +100.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss5}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Это конец?"
        subheader={`${props.allclick}/100.000 Кликов. +30 Эм.`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.miss5}>Выполнить</Button>
            
          </React.Fragment>
        }
      /> <br/>
      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Первая минута"
        subheader={`${props.playedsec}/60 сек. +15 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.playedmiss1}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="По пути в топ..."
        subheader={`${props.playedmin}/45 мин. +150 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.playedmiss2}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Чуть больше минуты"
        subheader={`${props.playedmin}/60 мин. +200 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.playedmiss3}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="60... и ещё 60.. и ещё..."
        subheader={`${props.playedhour}/3 часа +1.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.playedmiss4}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

      <Banner
                       before={<Avatar size={40}> <Icon28ListCheckOutline /> </Avatar> }

        header="Лучшие сутки"
        subheader={`${props.playedday}/24 часа +10.000 EC`}
       
        actions={
          <React.Fragment>          <br/> 

            <Button mode="commerce" onClick={props.playedmiss5}>Выполнить</Button>
            
          </React.Fragment>
        }
      />

</Group>

<Group header={<Header mode="secondary">VIP</Header>}>
      <Banner
                       before={<Avatar size={40}> <Icon28CheckShieldOutline /> </Avatar> }

        header="Тут будут VIP задания"
        subheader={`Но VIP ещё в разработке =(`}
       
        actions={
          <React.Fragment>          <br/> 
            
          </React.Fragment>
        }
      />

</Group>
  </Panel>
);

Missions.propTypes = {
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
export default Missions;
