import * as _ from 'lodash';
import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import * as groups from '../../data/groups.json';
import { debounce, getUrl } from '../utils';

@observer
export default class VoteManagerControls extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      showWizardModal: false
    };
  }

  openModal(modal) {
    if (modal === 'wizard') {
      this.setState({ showWizardModal: true });
    }
  }

  closeModal(modal) {
    if (modal === 'wizard') {
      this.setState({ showWizardModal: false });
    }
  }

  showGroup(key) {
    if (this.props.store.shownGroup !== key) {
      this.props.searchInPages(groups[key].data)
        .then(res => {
          this.props.store.setDelegates(res);
          this.props.store.showGroup(key);
        })
        .catch(err => console.warn(err));
    } else {
      this.props.navigate(this.props.store.selectedPage);
    }
  }

  selectPreset(key) {
    const delegates = groups[key].data;
    this.props.store.toggleDelegates(delegates, key);
  }

  resetSelectedDelegates() {
    this.props.store.setSelectedDelegates(this.props.store.initialVotes);
  }

  wipeSelectedDelegates() {
    this.props.store.setSelectedDelegates([]);
  }

  setSelectedToModerate() {
    const payoutModerate = _.uniq([...groups.builders.data, ...groups.gdt.data, ...groups.shw.data, "acheng", "adrianhunter", "anamix", "augurproject", "badman0316", "bigtom", "blackswan", "bloqspace.io", "carolina", "chamberlain", "communitypool", "crodam", "crolisk", "devasive", "diamse", "eastwind_ja", "elonhan", "forger_of_lisk", "goodtimes", "grajsondelegate", "honeybee", "hua", "iii.element.iii", "jixie", "leo", "liskjp", "liskpool.top", "liskpool_com_01", "liskroad", "loveforever", "luiz", "luxiang7890", "mac", "moosty", "moracle.network", "mrgr", "nimbus", "panzer", "phinx", "samuray", "savetheworld", "seven", "shinekami", "someonesomeone", "spacetrucker", "stellardynamic", "ultrafresh", "veriform", "vipertkd", "vrlc92", "will", "xujian", "zy1349"]);
    this.closeModal('wizard');
    this.props.store.setSelectedDelegates(payoutModerate);
  }

  setSelectedToRadical() {
    const payoutRadical = _.uniq([...groups.ascend.data, ...groups.builders.data, ...groups.dutchpool.data, ...groups.gdt.data, ...groups.indi.data, ...groups.lig.data, ...groups.shw.data, "acheng", "adrianhunter", "badman0316", "carolina", "chamberlain", "crodam", "eastwind_ja", "forger_of_lisk", "grajsondelegate", "iii.element.iii", "leo", "liskjp", "luxiang7890", "mrgr", "panzer", "phinx", "savetheworld", "seven", "someonesomeone", "spacetrucker", "will", "xujian"]);
    this.closeModal('wizard');
    this.props.store.setSelectedDelegates(payoutRadical);
  }

  setSelectedToDestroy() {
    const payoutDestroy = _.uniq([...groups.ascend.data, ...groups.builders.data, ...groups.dutchpool.data, ...groups.gdt.data, ...groups.indi.data, ...groups.lig.data, ...groups.shw.data]);
    this.closeModal('wizard');
    this.props.store.setSelectedDelegates(payoutDestroy);
  }

  renderFilters() {
    return Object.keys(groups).map(key => {
      const { fullname, tooltip } = groups[key];
      return (
        <div className="column col-4 col-xs-6" key={key}>
          <label className={`form-switch ${tooltip ? 'tooltip' : ''}`} data-tooltip={tooltip}>
            <input type="checkbox" checked={this.props.store.selectedSets.includes(key)} onChange={() => this.selectPreset(key)} />
            <i className="form-icon"></i> { fullname }
          </label>
          <button className="btn btn-link btn-sm" onClick={() => this.showGroup(key)}>{ this.props.store.shownGroup === key ? 'Hide' : 'Show' }</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="columns" id="intro-filters-block">
          { this.renderFilters() }
        </div>
        <div className="divider" />
        <div className="btn-group btn-group-block">
          <button className="btn btn-secondary" id="intro-restore-btn" onClick={() => this.resetSelectedDelegates()}>Reset to current</button>
{/*       <button className="btn btn-secondary text-success" id="intro-change-btn" onClick={() => this.setSelectedToRadical()}>Vote for change</button> */}
          <button className="btn btn-secondary text-success" id="intro-change-btn" onClick={() => this.openModal('wizard')}>Vote for change</button>
          <button className="btn btn-secondary" id="intro-unvote-btn" onClick={() => this.wipeSelectedDelegates()}>Unvote all</button>
        </div>
        <div className={`modal ${this.state.showWizardModal ? 'active' : ''}`} id="modal-id">
          <a href="#close" className="modal-overlay" aria-label="Close"></a>
          <div className="modal-container">
            <div className="modal-header">
              <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={() => this.closeModal('wizard')}></a>
              <div className="modal-title h5">Vote Wizard</div>
            </div>
            <div className="modal-body">
              <div className="content">
                <button className="btn btn-secondary btn-block text-success" onClick={() => this.setSelectedToModerate()}>Vote for a moderate change (1 vote step)</button>
                <div className="divider text-center" data-content="OR"></div>
                <button className="btn btn-secondary btn-block" onClick={() => this.setSelectedToRadical()}>Vote for a radical change (2 vote steps)</button>
                <div className="divider text-center" data-content="OR"></div>
                <button className="btn btn-secondary btn-block text-error" onClick={() => this.setSelectedToDestroy()}>Unvote all Elite (3 vote steps)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
