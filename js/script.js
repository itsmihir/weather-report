

window.addEventListener('load' ,() =>
{

    let long;
    let lat;
    let tempdegree=document.querySelector('.temperature-degree');
    let tempscale=document.querySelector('span');
    let timezone=document.querySelector('.location-timezone');
        if(navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(postionobject =>
        {
           long=postionobject.coords.longitude;   //  console.log(this.navigator.geolocation.getCurrentPosition.longitude)
           lat=postionobject.coords.latitude;
        
           const proxy=`https://cors-anywhere.herokuapp.com/`;
           const api=`${proxy}https://api.darksky.net/forecast/e1393f9a02ed0be5f0184873991a962e/${lat},${long}`;
   
           
           fetch(api)  
               .then(response=>
               {
                   return response.json();
               })
               .then(data =>
                   {
                       document.querySelector('.temperature-description').innerHTML=data.currently.summary;
                       tempdegree.innerHTML=data.currently.temperature;
                        timezone.innerHTML=data.timezone;
                        let f=data.currently.temperature;
                        let c=(5/9.0)*(f-32);
                        c=c.toPrecision(3);
                        var change=document.querySelector('.temperature').addEventListener('click',()=>
                        {
                            if(tempscale.innerHTML=='F')
                            {
                            tempdegree.innerHTML=c;
                            document.querySelector('span').innerHTML='C';
                            }else
                            {
                                tempdegree.innerHTML=f;
                                document.querySelector('span').innerHTML='F';
                            }
                        })

                        document.querySelector('.summary').innerHTML=data.hourly.summary;
                        document.querySelector('.summary2').innerHTML=data.daily.summary;
                       changeicon(data.hourly.icon);
                  //    changeicon(data.hourly.icon,);
                   })
               
         })
   

        }


        function changeicon(icon)
        {
            var skycons=new Skycons({color:"white"});
          
            icon=icon.replace(/-/g,'_').toUpperCase();
           
            skycons.play();
           return skycons.set(document.querySelector('.icon'),Skycons[icon]);
            
        }

        
})