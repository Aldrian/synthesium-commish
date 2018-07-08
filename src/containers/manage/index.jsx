import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { getAllCommissions, updateCommissionStatus } from "../../data/commissions/";
import CustomSelect from '../../components/customSelect'
import 'moment-timezone';
import 'moment/locale/fr';
import './Manage.css';
class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingCommissions: [],
            approvedCommissions: [],
            doingCommissions: [],
            finishedCommissions: [],
            rejectedCommissions: [],
        }
        this.props.getAllCommissions();
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.commissions && newProps.commissions.length > 0) {
            const pendingCommissions = newProps.commissions.filter(commission => commission.status === 'pending');
            const approvedCommissions = newProps.commissions.filter(commission => commission.status === 'approved');
            const doingCommissions = newProps.commissions.filter(commission => commission.status === 'doing');
            const finishedCommissions = newProps.commissions.filter(commission => commission.status === 'finished');
            const rejectedCommissions = newProps.commissions.filter(commission => commission.status === 'rejected');
            this.setState({
                pendingCommissions,
                approvedCommissions,
                doingCommissions,
                finishedCommissions,
                rejectedCommissions,
            });
        }
    }
    handleOptionChange(value, id) {
        this.props.updateCommissionStatus(id, value);
    }
    getCommissionElem(commission) {
        return (
            <div className="commission">
                <CustomSelect
                    elems={[
                        {
                            value: 'pending',
                            name: 'En attente',
                        },
                        {
                            value: 'approved',
                            name: 'Approuvée',
                        },
                        {
                            value: 'doing',
                            name: 'En cours',
                        },
                        {
                            value: 'finished',
                            name: 'Terminée',
                        },
                        {
                            value: 'rejected',
                            name: 'Rejetée',
                        },

                    ]}
                    commissionID={commission.id}
                    mode="manage"
                    init={commission.status}
                    isError={false}
                    handleOptionChange={this.handleOptionChange}
                />
                <p><i className="fa fa-user"></i>{' '}{commission.request.email}</p>
                <p>
                    <i className="fa fa-calendar"></i>
                    <Moment fromNow interval={30000} locale={this.props.locale}>
                        {commission.createdAt}
                    </Moment>
                </p>
                <p>
                    <i className="fa fa-question"></i>
                    {commission.request.option}
                </p>
                <p>
                    <i className="fa fa-plus"></i>
                    {commission.request.extras.join(', ')}
                </p>
                <Link to={`/request/${commission.id}`} className="commission-see"><i className="fa fa-eye"/></Link>
            </div>
        )
    }
    render() {
        return (
            <div className="Manage" onClick={this.props.onClick}>                
                <div className="container">
                   <div className="commissions">
                       {this.state.pendingCommissions.length > 0 && (
                           <div className="commission-group">
                                <h3>Commissions en attente</h3>
                                <div className="commission-group-commisions">
                                    {this.state.pendingCommissions.map(commission => this.getCommissionElem(commission))}
                                </div>
                           </div>
                       )}
                       {this.state.approvedCommissions.length > 0 && (
                           <div className="commission-group">
                                <h3>Commissions approuvées</h3>
                                <div className="commission-group-commisions">
                                    {this.state.approvedCommissions.map(commission => this.getCommissionElem(commission))}
                                </div>
                           </div>
                       )}
                       {this.state.doingCommissions.length > 0 && (
                           <div className="commission-group">
                                <h3>Commissions en cours</h3>
                                <div className="commission-group-commisions">
                                    {this.state.doingCommissions.map(commission => this.getCommissionElem(commission))}
                                </div>
                           </div>
                       )}
                       {this.state.finishedCommissions.length > 0 && (
                           <div className="commission-group">
                                <h3>Commissions terminées</h3>
                                <div className="commission-group-commisions">
                                    {this.state.finishedCommissions.map(commission => this.getCommissionElem(commission))}
                                </div>
                           </div>
                       )}
                       {this.state.rejectedCommissions.length > 0 && (
                           <div className="commission-group">
                                <h3>Commissions rejetées</h3>
                                <div className="commission-group-commisions">
                                    {this.state.rejectedCommissions.map(commission => this.getCommissionElem(commission))}
                                </div>
                           </div>
                       )}
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    commissions: state.commissions.commissions,
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getAllCommissions,
        updateCommissionStatus,
      },
      dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
