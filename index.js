/*
Input: Route object obtained from map directions API
Returns: Duration in seconds
*/
var calculateDuration = function (routeObject) {
   if (routeObject["routes"] && routeObject["routes"].length > 0) {
        var totalTime = 0;
         var  NewtotalTime = 0;
        if (routeObject["routes"] && routeObject["routes"][0].legs.length > 0) {
            for (var i = 0; i < routeObject["routes"].length; i++) {
                totalTime += routeObject["routes"][0].legs[0].duration.value;
                NewtotalTime += routeObject["routes"][0].legs[0].duration.text;
                    
                      if(totalTime>=3600){
                           
                         return NewtotalTime;
                       }
                       else{
                        var totalTime = Math.round(Math.floor(totalTime /60));
                         return totalTime;
                       }
            }
        }
       
    }
    else {
        return -1;
    }

    
}
//getting starting address

var getStartAddress = function (routeObject) {
    if (routeObject["routes"] && routeObject["routes"].length > 0) {
        var endAddress = "";
        var lastLegIndex = routeObject["routes"][0].legs ? routeObject["routes"][0].legs.length - 1 : -1;
        if (lastLegIndex >= 0) {
            startAddress = routeObject["routes"][0].legs[lastLegIndex].start_address;
        }
        return startAddress;
    }
    else {
        return "";
    }
}

/*
Input: Route object obtained from API
Returns: end address string
*/

var getEndAddress = function (routeObject) {
    if (routeObject["routes"] && routeObject["routes"].length > 0) {
        var endAddress = "";
        var lastLegIndex = routeObject["routes"][0].legs ? routeObject["routes"][0].legs.length - 1 : -1;
        if (lastLegIndex >= 0) {
            endAddress = routeObject["routes"][0].legs[lastLegIndex].end_address;
        }
        return endAddress;
    }
    else {
        return "";
    }
}

/*
Input: Transit route object from API
Returns: departure time string
*/
var getDepartureTime = function (routes) {
    if (routes["routes"] && routes["routes"].length > 0) {
        var departure = routes["routes"][0].legs[0]?routes["routes"][0].legs[0].departure_time.text:"";
        return departure;
    }
    else {
        return "";
    }
}

/*
Input: Transit route object from API
Returns: departure time string
*/
var getArrivalTime = function (routes) {
    if (routes["routes"] && routes["routes"].length > 0) {
        var lastLegIndex = routes["routes"][0].legs ? routes["routes"][0].legs.length - 1 : -1;
        var arrivalTime = "";
        if(lastLegIndex >= 0){
            arrivalTime = routes["routes"][0].legs[lastLegIndex].arrival_time.text;
        }
        return arrivalTime;
    }
    else {
        return "";
    }
}


  

   




      var getRouteObject = function(routeType, callback)
 {
    var reqUrl = "";
    switch (routeType)
    {
        case "driving":
        reqUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&key=AIzaSyBoApnrKXe3XIvvmVWDDdmJRtYAKG2bxEw";
        break;

        case "walking":
        reqUrl="https://maps.googleapis.com/maps/api/directions/json?origin=MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&mode=walking&key=AIzaSyBoApnrKXe3XIvvmVWDDdmJRtYAKG2bxEw";
        break;

        case "transit":
      reqUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&mode=transit&key=AIzaSyBoApnrKXe3XIvvmVWDDdmJRtYAKG2bxEw";
        break;

        case "biking":
       reqUrl ="https://maps.googleapis.com/maps/api/directions/json?origin=MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&mode=bicycling&key=AIzaSyBoApnrKXe3XIvvmVWDDdmJRtYAKG2bxEw";
        break;

        default:
           reqUrl="https://maps.googleapis.com/maps/api/directions/json?origin=MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&mode=walking&key=AIzaSyBoApnrKXe3XIvvmVWDDdmJRtYAKG2bxEw";
        break;
    }
 
    
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() 
     {
    if (this.readyState == 4 && this.status == 200) 
    {
          var resObj = this.responseText;
          var routeObject = {};
          try
          {
            var routeObject = JSON.parse(resObj);
          }
          catch(e)
          {
            var routeObject = {};
          }
          if(callback)
          {
              callback.call(this, routeObject);
          }
   }
  }; 
        
  
   xhttp.open("GET", reqUrl, true);
     xhttp.send();
}
         function CarFunction(routeObject) {
               
                console.log(routeObject);
                document.getElementById("cartime").innerHTML =calculateDuration(routeObject)

        };

         function TransitFunction(routeObject) {
               //bus 
                console.log(routeObject);
                document.getElementById("bustime").innerHTML =calculateDuration(routeObject)
                document.getElementById("frombusplace").innerHTML=getStartAddress(routeObject)
                //document.getElementById("tobusplace").innerHTML=getEndAddress(routeObject) 
                document.getElementById("busarrivaltime").innerHTML=getArrivalTime(routeObject) 
                document.getElementById("busdeparturetime").innerHTML=getDepartureTime(routeObject) 

             //train
                 document.getElementById("traintime").innerHTML =calculateDuration(routeObject)
                document.getElementById("fromtrainplace").innerHTML=getStartAddress(routeObject)
                //document.getElementById("totrainplace").innerHTML=getEndAddress(routeObject)
                document.getElementById("trainarrivaltime").innerHTML=getArrivalTime(routeObject) 
                document.getElementById("traindeparturetime").innerHTML=getDepartureTime(routeObject)                       
        };

         function BicycleFunction(routeObject) {
               
                console.log(routeObject);
                document.getElementById("bicycletime").innerHTML =calculateDuration(routeObject)
                                           
        };
         function WalkingFunction(routeObject) {
               
                console.log(routeObject);
                document.getElementById("walkingtime").innerHTML =calculateDuration(routeObject)

        };
  
 var loadDoc=function()
   {
       getRouteObject("driving",CarFunction);
       getRouteObject("transit",TransitFunction);
       getRouteObject("biking",BicycleFunction);
       getRouteObject("walking",WalkingFunction);
       var x=document.getElementsByClassName("common");
         var y=document.getElementsByClassName("loader");            
       for(var i=0;i<=10;i++){
         x[i].style.display ="block";
         y[i].style.display ="none";
       }
        
        
       

    };
       
  /*var transitpopup=function(){
   var url="https://www.google.com/maps/dir/?api=1&origin=7MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&travelmode=transit";
   window.open(url,'popUpWindow','height=400,width=800,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }
 var carpopup=function(){
   var url="https://www.google.com/maps/dir/?api=1&origin=7MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&travelmode=driving";
   window.open(url,'popUpWindow','height=400,width=800,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }
   var bicyclepopup=function(){
   var url="https://www.google.com/maps/dir/?api=1&origin=7MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&travelmode=bicycling";
   window.open(url,'popUpWindow','height=400,width=800,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }
   var walkingpopup=function(){
   var url="https://www.google.com/maps/dir/?api=1&origin=7MCS+Solutions+Global+Headquarters+-+Belgium,+Sneeuwbeslaan,+Antwerp,+Belgium&destination=antwerp+central+station&travelmode=walking";
   window.open(url,'popUpWindow','height=400,width=800,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }*/