import React, { Component } from 'react';

export default class NotifyComp extends Component{
  constructor(props) {
    super(props);
    this.state={
      hours: `00`,
      minutes:`00`,
      focus:'minutes',
      interval: 5,
    }
    this.handleInputChangeHour = this.handleInputChangeHour.bind(this);
    this.handleInputChangeMinutes = this.handleInputChangeMinutes.bind(this);

  };

  componentWillMount(){
    let itemHours = Number(this.props.value.match(/^(\d+)/)[1]);
    let itemMinutes = Number(this.props.value.match(/:(\d+)/)[1]);
    itemHours = itemHours < 10 ? '0' + itemHours : itemHours;
    itemMinutes = itemMinutes < 10 ? '0' + itemMinutes : itemMinutes;
    this.setState({
      hours: itemHours,
      minutes: itemMinutes
    })
  }

  componentWillReceiveProps(nextProps){
    let itemHours = Number(nextProps.value.match(/^(\d+)/)[1]);
    let itemMinutes = Number(nextProps.value.match(/:(\d+)/)[1]);
    itemHours = itemHours < 10 ? '0' + itemHours : itemHours;
    itemMinutes = itemMinutes < 10 ? '0' + itemMinutes : itemMinutes;
    this.setState({
      hours: itemHours,
      minutes: itemMinutes
    })
  }
  
  hour_plus=(minute)=>{
    let hourTmp = Number(this.state.hours);
    if(hourTmp < 23){
      hourTmp = hourTmp + 1;
      if(hourTmp < 10){
        hourTmp = `0${hourTmp}`
      }
      this.setState({
        hours: hourTmp
      })
      this.props.onChange(`${hourTmp}:${minute ? minute : this.state.minutes}`)

    } else {
      this.setState({
        hours: `00`
      })
      this.props.onChange(`00:${minute ? minute :this.state.minutes}`)
    }
    this.setBorderToHours()
  }
  hour_minus=(minute)=>{
    let hourTmp = Number(this.state.hours);
    if(this.state.hours > 0){
      hourTmp = hourTmp - 1;
      if(hourTmp < 10){
        hourTmp = `0${hourTmp}`
      }
      this.setState({
        hours: hourTmp
      })
      this.props.onChange(`${hourTmp}:${minute ? minute :this.state.minutes}`)
    }else{
      this.setState({
        hours: 23
      })
      this.props.onChange(`23:${minute ? minute :this.state.minutes}`)

    }

    this.setBorderToHours()
  }
  minutes_plus=()=>{
    let minuteTmp = Number(this.state.minutes);
    minuteTmp = minuteTmp + this.state.interval;
    if(minuteTmp < 59){
      if(minuteTmp < 10){
        minuteTmp = `0${minuteTmp}`
      }
      this.setState({
        minutes: minuteTmp,
      })
      this.props.onChange(`${this.state.hours}:${minuteTmp}`)
    } else {
      this.setState({
        minutes: `00`,
      })
      this.hour_plus(`00`);
    }
    this.setBorderToMinutes()
  }
  minutes_minus=()=>{
    let minuteTmp = Number(this.state.minutes);
    minuteTmp = minuteTmp - this.state.interval;
    if(minuteTmp > 0){
      minuteTmp = minuteTmp < 0 ? 60 + minuteTmp : minuteTmp;
      if(minuteTmp < 10){
        minuteTmp = `0${minuteTmp}`
      }
      this.setState({
        minutes: minuteTmp
      })
      this.props.onChange(`${this.state.hours}:${minuteTmp}`)
    } else {
      this.setState(state => ({
        minutes: ((minuteTmp < 0 ) ? ((55 - minuteTmp) - state.interval ) : (minuteTmp===0) ? '00' : 60 - state.interval) ,
      }))
      let mnt = ((minuteTmp < 0 ) ? ((55 - minuteTmp) - this.state.interval ) : (minuteTmp===0) ? '00' : 60 - this.state.interval)
      if(minuteTmp<0){
        this.hour_minus(mnt);
      }else{
        this.props.onChange(`${this.state.hours}:${minuteTmp}`)
      }
    }
    this.setBorderToMinutes()
  }
  setBorderToHours() {
    // document.getElementById("input-hours").style.borderBottomColor="#20A8D8"; 
    document.getElementById("input-hours").style.transition = "border-bottom-color .6s"; 
    // document.getElementById("input-minutes").style.borderBottomColor="#cecece"; 
    document.getElementById("input-minutes").style.transition = "border-bottom-color .6s"; 
  }
  setBorderToMinutes() {
    // document.getElementById("input-minutes").style.borderBottomColor="#20A8D8"; 
    document.getElementById("input-minutes").style.transition = "border-bottom-color .6s"; 
    // document.getElementById("input-hours").style.borderBottomColor="#cecece"; 
    document.getElementById("input-hours").style.transition = "border-bottom-color .6s"; 
  }
  changeFocusToHours = () => {
    this.setBorderToHours()
    this.setState({
      focus:'hours'
    })
  }
  changeFocusToMinutes = () => {
    this.setBorderToMinutes()
    this.setState({
      focus:'minutes'
    })
  }

  handleInputChangeHour = e => {
    let hourTmp = e.target.value ? e.target.value : 0;
    if(!isNaN(hourTmp)){
      if(hourTmp > 23){
        hourTmp = 23;
      }
      hourTmp = Number(hourTmp) > 9 ? Number(hourTmp) : `0${Number(hourTmp)}`;
      this.setState({
        hours: hourTmp,
      })
      this.props.onChange(`${hourTmp}:${this.state.minutes}`)

    }
  }

  handleInputChangeMinutes = e => {
    let minuteTmp = e.target.value ? e.target.value : 0;
    if(!isNaN(minuteTmp)){
      if(minuteTmp > 59){
        minuteTmp = 59;
      }
      minuteTmp = Number(minuteTmp) > 9 ? Number(minuteTmp) : `0${Number(minuteTmp)}`;
      this.setState({
        minutes: minuteTmp,
      })
      this.props.onChange(`${this.state.hours}:${minuteTmp}`)
    }
  }

  render(){
    let timeValue = {target:{value:`${this.state.hours}:${this.state.minutes}`}}
    return(
    <div>
      <div className="custom-time-control-hour" style={{display: 'flex'}}>
        <div className="custom-time-counter-plus" onClick={(e) => this.hour_plus()} style={{padding: '0 0 0 .2rem'}}><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
        <div className="custom-time-counter-plus" onClick={(e) =>this.minutes_plus()} style={{padding: '0 0.2rem 0 0'}}><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
      </div>
      <div className={`btn custom-time2 ${this.props.className}`} onClick={() => this.props.handleClick(timeValue)} onContextMenu={this.props.onContextMenu}>
        <input type="text" pattern="[^()/><\][\\\x22,;|]+" onClick={this.changeFocusToHours} id="input-hours" value={this.state.hours} onChange={(e) => this.handleInputChangeHour(e) }/>
        <span style={{marginLeft:'2px',marginRight:'3px'}}>:</span>
        <input type="text" pattern="[^()/><\][\\\x22,;|]+" onClick={this.changeFocusToMinutes} id="input-minutes" value={this.state.minutes} onChange={(e) => this.handleInputChangeMinutes(e) }/>
      </div>  
      <div className="custom-time-control-hour-minus" style={{display: 'flex'}}>
        <div className="custom-time-counter-minus" onClick={(e) =>this.hour_minus()} style={{padding: '0 0 0 .2rem'}}><i class="fa fa-chevron-down" aria-hidden="true"></i></div>
        <div className="custom-time-counter-minus" onClick={(e) =>this.minutes_minus()} style={{padding: '0 0.2rem 0 0'}}><i class="fa fa-chevron-down" aria-hidden="true"></i></div>
      </div>
    </div>  
    )
  }
}