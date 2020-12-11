import React, { Component } from 'react'
import WidgetText from './WidgetText';
import WidgetChart from './widgetChart';
import WidgetDoughnut2d from './WidgetDoughnut2d';
import Dropdown from 'react-dropdown';
import WidgetLineChart from './WidgetLineChart'
import 'react-dropdown/style.css';

//excel import
const config = {
   apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
   spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
   }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class Content extends Component {

   constructor() {
      super();
      this.state = {
         items: [],
         dropdownOptions: [],
         trendStore: [],
         Uusers:[],
         selectedValue: null,
         organicSourceViews: null,
         directSourceViews: null,
         referralSourceViews:null,
         socialSourceViews:null,
         emailSourceViews:null,
         pageViews:null,
         users:null,
         newUsers:null,
         sessions:null,
         numberOfSessionsPerUsers:null,
         pagePerSession:null,
         avgSessionTime:null,
         bounceRate:null,
         des:"",
      };
  }
  getData = arg => {

   const arr = this.state.items;
   const arrLen = arr.length;
   let organicSourceViews = 0;
   let directSourceViews = 0;
   let selectedValue = null;
   let trendStore = [];
   let referralSourceViews=0;
   let socialSourceViews=0;
   let emailSourceViews=0;
   let pageViews=0;
   let users=0;
   let newUsers=0;
   let sessions=0;
   let numberOfSessionsPerUsers=0;
   let pagePerSession=0;
   let avgSessionTime=0;
   let bounceRate=0;
   let Uusers = [];
   let des=[];
   

   for (let i = 0; i < arrLen; i++) {

       if (arg === arr[i]["month"]) {
           console.log(arg);

           organicSourceViews = arr[i].organic_source;
           directSourceViews = arr[i].direct_source;
           referralSourceViews=arr[i].referral_source;
            socialSourceViews=arr[i].social_source;
            emailSourceViews=arr[i].email_source;
            pageViews=arr[i].page_views;
            users=arr[i].users;
            newUsers=arr[i].new_users;
            sessions=arr[i].sessions;
            numberOfSessionsPerUsers=arr[i].number_of_sessions_per_users;
            pagePerSession=arr[i].page_per_session;
            avgSessionTime=arr[i].avg_session_time;
            bounceRate=arr[i].bounce_ratee;

        if(arg=="Jan 2018"){
            des[0]="";
        }else{
            if(arr[i].organic_source>arr[i-1].organic_source){
                let percentage = ((arr[i].organic_source-arr[i-1].organic_source)/arr[i-1].organic_source)*100;
                des[0]=Math.round(percentage) + "% Increased";
            }else if(arr[i].organic_source<arr[i-1].organic_source){
                let percentage = ((arr[i-1].organic_source-arr[i].organic_source)/arr[i].organic_source)*100;
                des[0]=Math.round(percentage) + "% Decresed";
            }

            if(arr[i].direct_source>arr[i-1].direct_source){
                let percentage = ((arr[i].direct_source-arr[i-1].direct_source)/arr[i-1].direct_source)*100;
                des[1]=Math.round(percentage) + "% Increased";
            }else if(arr[i].direct_source<arr[i-1].direct_source){
                let percentage = ((arr[i-1].direct_source-arr[i].direct_source)/arr[i].direct_source)*100;
                des[1]=Math.round(percentage) + "% Decresed";
            }

            if(arr[i].referral_source>arr[i-1].referral_source){
                let percentage = ((arr[i].referral_source-arr[i-1].referral_source)/arr[i-1].referral_source)*100;
                des[2]=Math.round(percentage) + "% Increased";
            }else if(arr[i].referral_source<arr[i-1].referral_source){
                let percentage =((arr[i-1].referral_source-arr[i].referral_source)/arr[i].referral_source)*100;
                des[2]=Math.round(percentage) + "% Decresed";
            }

            if(arr[i].social_source>arr[i-1].social_source){
                let percentage = ((arr[i].organic_source-arr[i-1].social_source)/arr[i-1].social_source)*100;
                des[3]=Math.round(percentage) + "% Increased";
            }else if(arr[i].social_source<arr[i-1].social_source){
                let percentage = ((arr[i-1].social_source-arr[i].social_source)/arr[i].social_source)*100;
                des[3]=Math.round(percentage) + "% Decresed";
            }

        }



           trendStore.push(
            {
               label: "Oraganic",
               value: arr[i].organic_source,
           }, 
           {
               label: "Referral",
               value: arr[i].referral_source,
           },
           {
            label: "Social",
            value: arr[i].social_source,
           },
           {
            label: "Direct",
            value: arr[i].direct_source,
            } 
           );

           Uusers.push(
            {
               label: "Users",
               value: arr[i].users,
           }, 
           {
               label: "New Users",
               //alpha: 5,
               value: arr[i].new_users,
           }
           );
           

       }
   }
   selectedValue = arg;

   this.setState({
       organicSourceViews: organicSourceViews,
       directSourceViews: directSourceViews,
       socialSourceViews:socialSourceViews,
       emailSourceViews:emailSourceViews,
       referralSourceViews:referralSourceViews,
       newUsers:newUsers,
       users:users,
       trendStore: trendStore,
       Uusers:Uusers,
       des:des,
   });
};

   
updateDashboard = event => {
   this.getData(event.value);
   this.setState({ selectedValue: event.value });
};

   componentDidMount(){
   
      fetch(url).then(response => response.json()).then(data =>{
         let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
       

                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );

      });
      
   }



    render() {



        return (
            <div>
               <div className="v">
               <div className="container">
                  <div className="row">
                     <div className="col-12 bg-white shadow-sm rounded-top p-1">
                      <div className="d-flex justify-content-end">
                         <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />;
                      </div>
                     </div>
               </div>
{/*--------------------------------------First ROW--------------------------------------------- */}

                 <div className="row mt-3">

                  <div className="col-md-12 col-lg-6">
                        <div className="row">
                        <WidgetText title={"Organic Source Views"} value={this.state.organicSourceViews} des={this.state.des[0]} />
                        <WidgetText title={"Referral Source Views"} value={this.state.referralSourceViews} des={this.state.des[2]} />
                        </div>
                        <div className="row mt-3">
                        <WidgetText title={"Direct Source Views"} value={this.state.directSourceViews} des={this.state.des[1]} />
                        <WidgetText title={"Social Source Views"} value={this.state.socialSourceViews} des={this.state.des[3]} />
                        </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                  <div className="content bg-white shadow-sm rounded-top">
                 <WidgetLineChart title="PROJECTIONS" data={this.state.trendStore} />
                  </div>

                  </div>

                 </div>

{/*--------------------------------------SECOND ROW--------------------------------------------- */}


                 <div className="row mt-3">

                  <div className="col-md-12 col-lg-7">
                     <div className="content bg-white shadow-sm rounded-top">
                     <WidgetChart title="PROJECTIONS" data={this.state.trendStore}/>
                     </div>
                  </div>
                  <div className="col-md-12 col-lg-5">
                     <WidgetDoughnut2d title="TOTAL USERS" data={this.state.Uusers}/>
                  </div>

                 </div>

                 </div>  
                </div>
            </div>
        )
    }
}

export default Content;






