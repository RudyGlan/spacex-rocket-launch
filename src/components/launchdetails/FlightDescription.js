import React from "react";
import PropTypes from "prop-types";

import Metrics from '../general/Metrics';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('MainStore')
@observer
class FlightDescription extends React.Component {

  render() {
    const {launch, rocket, launchSite, isError} = this.props.MainStore.listState;
    let rocketMetrics, launchPadMetrics;
    if(!isError && launch && rocket && launchSite){
    rocketMetrics = [
        { label: 'Name', value: rocket.name },
        { label: 'Company', value: rocket.company },
        { label: 'Height', value: `${rocket.height.meters}M / ${rocket.height.feet}FT` },
        { label: 'Diameter', value: `${rocket.diameter.meters}M / ${rocket.diameter.feet}FT` },
        { label: 'Mass', value: `${rocket.mass.kg}KG / ${rocket.mass.lb}LB` },
        { label: 'First flight', value: rocket.first_flight },
        { label: 'Country', value: rocket.country },
        { label: 'Success rate', value: `${rocket.success_rate_pct}%` },
        { label: 'Cost per launch', value: `$${rocket.cost_per_launch}` },
      ];
    
      launchPadMetrics = [
        { label: 'Name', value: launchSite.full_name },
        { label: 'Location', value: launchSite.location.name },
      ];
    }
    return (
      <div className="flight__description">
        {!isError && launch && rocket && launchSite ?
        <div >
              <Metrics title="Details" description={launch.details} />
              <Metrics title="Rocket" items={rocketMetrics} description={rocket.description} />
              <Metrics title="Launch pad" items={launchPadMetrics} description={launchSite.details} />
        </div> : null}
        </div>
    );
  }
}

export default FlightDescription;
