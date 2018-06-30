import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../components/button';
import profileImage from './profile.png';
import blokeImage from './bloke.png';
import nekolycheeImage from './nekolychee.png';
import sketchImage from './sketch.png';
import chibiImage from './chibi.png';
import requestBG from './request-bg.png';
import './Landing.css';

class Landing extends Component {
	componentDidMount() {
		const slider = window.tns({
			container: ".slide__container",
			arrowKeys: true,
			controlsText: [
				'<i className="fas fa-angle-left"></i>',
				'<i className="fas fa-angle-right"></i>'
			],
			nav: false
		});

		new window.Waypoint({
			element: document.querySelector(".landing-title"),
			handler: function (direction) {
				if (direction === "down") {
					document.querySelector("nav").classList.add("fixed");
				} else {
					document.querySelector("nav").classList.remove("fixed");
				}
			},
			offset: -80
		});
	}
	render() {
		return (
			<div className="Landing">
				<nav className="nav--desktop">
					<a href="" className="js-btn" data-hover="home">
						home
					</a>
					<a href="" className="js-btn" data-hover="work">
						my work
					</a>
					<a href="" className="js-btn" data-hover="offers">
						prices
					</a>
					<a href="" className="js-btn" data-hover="rules">
						rules
					</a>
					<a href="" className="js-btn" data-hover="request">
						request an art
					</a>
				</nav>

				<section className="section--hero">
					<div className="flex--horizontal">
						<div className="flex_child--horizontal aligner">
							<h1 className="font-fjalla landing-title">Hi!</h1>
							<p className="">I'm Synthesium, a young 3D artist, illustrator in my spare time coming from Switzerland. <br />
								I love video games, especially from Nintendo, Blizzard and Final Fantasy XIV. <br />
								I hope you liked what I made, thanks for spending some time on my page!
								</p>
						</div>
						<div className="flex_child--horizontal fadeInUp">
							<img src={profileImage} alt="" />
						</div>
					</div>
					<div className="section__title">
						<h3 className="font-fjalla">Follow me on</h3>
					</div>
				</section>

				<section className="section--work scroll-to-reveal js-section">
					<div className="section__title">
						<h3 className="font-fjalla">My work</h3>
						<p>Here's a few sample of what I've been working on lately</p>

						<div className="slide__container">
							<div>
								<div className="flex--horizontal slide">
									<div className="slide__content">
										<h4 className="font-fjalla slide-1">
											Character commission
										</h4>
										<p className="slide-1">
											Art made for blokeymon Kenobi to thank him for beeing such an awesome leader and mentor!
										</p>
									</div>
									<div className="slide__image slide-1">
										<img src={blokeImage} alt="Comission - bloke" />
									</div>
								</div>
							</div>

							<div>
								<div className="flex--horizontal slide">
									<div className="slide__content">
										<h4 className="font-fjalla slide-2">
											Art trade
										</h4>
										<p className="slide-2">
											Art trade made for the artist nekolychee
										</p>
									</div>
									<div className="slide__image slide-2">
										<img src={nekolycheeImage} alt="Art-trade - nekolychee" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="section--Pricing scroll-to-reveal js-section">
					<div className="section__title">
						<h3 className="font-fjalla">Prices</h3>
						<p>Interested in my art? Here's what I can do for you</p>
						<div className="pricing">
							<div className="pricing__item">
								<h3 className="pricing__title">Sketch</h3>
								<p className="pricing__sentence"><img src={sketchImage} alt="" /></p>
								<div className="pricing__price"><span className="pricing__currency">$</span>10</div>
								<ul className="pricing__feature-list">
									<li className="pricing__feature">Sketch</li>
									<li className="pricing__feature">Base color</li>
								</ul>
								<button className="pricing__action" aria-label="Purchase this plan"><span className="fa fa-arrow-right"></span></button>
							</div>
							<div className="pricing__item">
								<h3 className="pricing__title">Chibi</h3>
								<p className="pricing__sentence"><img src={chibiImage} alt="" /></p>
								<div className="pricing__price"><span className="pricing__currency">$</span>12</div>
								<ul className="pricing__feature-list">
									<li className="pricing__feature">Lineart</li>
									<li className="pricing__feature">Colored</li>
									<li className="pricing__feature">Shaded</li>
								</ul>
								<button className="pricing__action" aria-label="Purchase this plan"><span className="fa fa-arrow-right"></span></button>
							</div>
							<div className="pricing__item">
								<h3 className="pricing__title">Character</h3>
								<p className="pricing__sentence"><img src={profileImage} alt="" /></p>
								<div className="pricing__price"><span className="pricing__currency">$</span>25</div>
								<ul className="pricing__feature-list">
									<li className="pricing__feature">Lineart</li>
									<li className="pricing__feature">Colored</li>
									<li className="pricing__feature">Shaded</li>
								</ul>
								<button className="pricing__action" aria-label="Purchase this plan"><span className="fa fa-arrow-right"></span></button>
							</div>
							<div className="pricing__item more">
								<h3 className="pricing__title">Need more?</h3>
								<ul className="pricing__feature-list">
									<li className="pricing__feature">Additional character: + 50% of the price </li>
									<li className="pricing__feature">Simple background: + $5 </li>
									<li className="pricing__feature">Complex background: + $10 </li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section className="section--rules">
					<div className="section__title">
						<h3 className="font-fjalla">Rules</h3>
						<p>To get things going smoothly</p>
					</div>
					<div>
						<p>
							1. I accept to draw: <br />
							Pretty much anything, animals, anthros, creatures (mythical or not), original species, original characters, canon characters, gore, humans (not always, it's specified if not)...
						</p>
						<p>
							2. But I wont draw: <br />
							Hate stuff, fetishes...
							I keep the right to refuse a commission if I'm not comfortable doing it.

						</p>
						<p>
							3. Visual reference: <br />
							I need a basic visual of the character(/s) to work, I won't accept to work with only written descriptions (it takes a lot of time to translate for me).
							Of course, you can write some details to complete the reference.

						</p>
						<p>
							4. Examples: <br />
							There will always be some examples to represent, the best possible, what is proposed.

						</p>
						<p>
							5. Payment: <br />
							Paypal only.

						</p>
						<p>
							6. Files, shipments and reposting: <br />
							All drawings will be posted on DeviantArt and sometime other website such as Tumblr, Facebook,Twitter... (except on request), in high resolution and with my watermark on it. <br />
							For traditional work, I can send the original art to you, but at your expense (Also, I couldn't be held responsible if the mail is lost). <br />
							For Digital work, you can ask for the .psd file. <br />
							You can ask for an unmarked version. <br />
							You can repost your commissioned artwork on DA or other website BUT Please credit me as the artist , and always Let my watermark on it. <br />

						</p>
					</div>
				</section>
				<section className="section--request js-section" style={{
					backgroundImage: `url(${requestBG})`,
					backgroundRepeat: 'repeat',
				}}>
					<div className="section__title">
						<h3 className="font-fjalla">Ready to get started?</h3>
						<p>Make your request and I'll get in touch shortly!</p>
						<div className="button-wrapper">
							<Button name="Order"/>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;
