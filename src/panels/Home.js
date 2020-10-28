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
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon24SkipNext from '@vkontakte/icons/dist/24/skip_next';
import Icon12Fire from '@vkontakte/icons/dist/12/fire';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon24Send from '@vkontakte/icons/dist/24/send';
import Icon24Game from '@vkontakte/icons/dist/24/game';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon20GiftOutline from '@vkontakte/icons/dist/20/gift_outline';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/settings';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import Icon28Users from '@vkontakte/icons/dist/28/users';
import { Panel, Button, Group, Gallery, Div, Avatar, Separator, PanelHeader, Footer, Search, CardGrid, Card, List, Cell, Header, Tooltip, FormStatus, FixedLayout, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import '@vkontakte/vkui/dist/vkui.css';

/*function addSecond() {
	fetch(`https://jopaslona.ml:9090/app/second/?uid=${this.state.fetchedUser.id}&photo=${this.state.fetchedUser.photo_100}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
}

setInterval(addSecond, 1000); */

const Home = props => (
	<Panel id={props.id} separator={false}>
	<div class='inn'>
	<div class="specialBalanceTitle">Ваш Баланс</div>
	<div class="title">{parseFloat(props.balance).toFixed(4)} <small>EC</small></div>
	<div class="essubtitle">{parseFloat(props.pole1).toFixed(4)} <small>ES</small></div>
	<div class="subtitle">{parseFloat(props.clicksss).toFixed(4)}/Клик</div>
	<div class="subtitle">{parseFloat(props.secadd).toFixed(4)}/Секунда</div>
	   
	<button className='menuBonusButton' onClick={props.go} data-to="morelist"><Icon28ListOutline fill='#ffffff' /></button>

              <div className='menuElement1'>
		<div className='MenuButtons__button'>
			<div className='MenuButtons__icon'>
				<Icon28Users className='menuButtonElement' fill='#000' onClick={props.go} data-to="top" />

			</div>
		</div>
	</div>
			

		<div className='menuElement2'>
		<div className='MenuButtons__button'>
			<div className='MenuButtons__icon'>
				<Icon24MoneyTransfer className='menuButtonElement' fill='#ffffff' onClick={props.modal} data-to="transfer" />
			</div>
			
		</div>
	</div>

<div className='menuElement3'>
		<div className='MenuButtons__button'>
			<div className='MenuButtons__icon'>
				<Icon28ListOutline className='menuButtonElement' fill='#000' onClick={props.go} data-to="shop" />
			</div>
			
		</div>
	</div>


	</div>
	 <FixedLayout vertical="bottom">
          <Div>
       <img src="https://sun3-12.userapi.com/dwW_u-HhoIadVctRns5dMVdQ2kE0K818c1h2Mw/z-2TyDygC7s.jpg" onClick={props.click} className='ClckBut' />
     </Div>
          </FixedLayout>
	</Panel>

);

Home.propTypes = {
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

export default Home;
