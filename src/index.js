import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Switch, Route} from 'react-router-dom';

import store, {history} from './data/create-store';

import {IntlProvider} from 'react-intl';
import {addLocaleData} from 'react-intl';

import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';

import messages_en from './data/intl/language_en';
import messages_fr from './data/intl/language_fr';
import messages_default from './data/intl/language_def';

import './bootstrap-reboot.css';
import './bootstrap-grid.css';
import './index.css';
import Landing from './containers/landing/';
import registerServiceWorker from './registerServiceWorker';


addLocaleData([
	...locale_en,
	...locale_fr,
]);

const messages = {
	fr: messages_fr,
	en: messages_en,
	def: messages_default,
};


const Index = (props) => (
  <IntlProvider
		locale={props.locale}
		messages={messages[props.locale] ? messages[props.locale] : messages.def}
	>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Landing} />
			</Switch>
		</ConnectedRouter>
  </IntlProvider>
);
const mapStateToProps = (state) => ({
	locale: state.ui.locale,
});
const ConnectedIndex = connect(mapStateToProps)(Index);
ReactDOM.render(
	<Provider store={store}>
		<ConnectedIndex />
	</Provider>,
	document.getElementById('root'),
);

//registerServiceWorker();
