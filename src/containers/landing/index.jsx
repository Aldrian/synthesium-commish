import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import profileImage from './profile.png';
import blokeImage from './bloke.png';
import nekolycheeImage from './nekolychee.png';
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    const slider = window.tns({
      container: ".slide__container",
      arrowKeys: true,
      controlsText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>'
      ],
      nav: false
    });

    new window.Waypoint({
      element: document.querySelector(".landing-title"),
      handler: function(direction) {
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
						offers
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
							<p className="">I'm synthesium, welcome to my page!</p>
						</div>
						<div className="flex_child--horizontal fadeInUp">
							<img src={profileImage} alt="" />
						</div>
					</div>
					<div class="section__title">
						<h3 class="font-fjalla">Follow me on</h3>
					</div>
				</section>

				<section class="section--work scroll-to-reveal js-section">
					<div class="section__title">
						<h3 class="font-fjalla">My work</h3>
						<p>Here's a few sample of what I've been working on lately</p>

						<div class="slide__container">
							<div>
								<div class="flex--horizontal slide">
									<div class="slide__content">
										<h4 class="font-fjalla slide-1">
											Character commission
										</h4>
										<p class="slide-1">
                      Art made for blokeymon Kenobi to thank him for beeing such an awesome leader and mentor!
										</p>
									</div>
									<div class="slide__image slide-1">
										<img src={blokeImage} alt="Comission - bloke" />
									</div>
								</div>
							</div>

							<div>
								<div class="flex--horizontal slide">
									<div class="slide__content">
										<h4 class="font-fjalla slide-2">
											Art trade
										</h4>
										<p class="slide-2">
											Art trade made for the artist nekolychee
										</p>
									</div>
									<div class="slide__image slide-2">
										<img src={nekolycheeImage} alt="Art-trade - nekolychee" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;
