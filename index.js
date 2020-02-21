var button = document.getElementById('search')

if(button)
    button.addEventListener('clicked',Search)
function Search()
{
    var result = document.getElementById('card_group')
    //console.log(result)
    
    var query = document.getElementById('searchbar').value;
    if(query == '')
        console.log("Empty string")
    else
    {
        fetchData('locations',query)
        result.innerHTML = ""
        document.getElementById('searchbar').value = ""
    }//console.log("from inside search: "+query)
}


function fetchData(endpoint,queryparam)
{
    var baseurl = "https://developers.zomato.com/api/v2.1/"
    var count = 10
    var query = queryparam
    queryparam = "?" + "query=" + queryparam+ "&" + "count=" + count
    var xhr = new XMLHttpRequest();
    console.log(baseurl+endpoint+queryparam)
    
    xhr.addEventListener('readystatechange', function(event)
        {
        if(this.readyState == 4)
            {
                 var responseObject = JSON.parse(this.responseText);
                 console.log(responseObject)
                 //console.log(responseObject.location_suggestions.length)
                 resultcountupdate(responseObject.location_suggestions.length,query)
                 Update(responseObject)
                //console.log(responseObject.location_suggestions)
                 
            }
    })
    
    xhr.open("GET",baseurl+endpoint+queryparam)
    xhr.setRequestHeader("user-key", "aebcf54376d5787dd8d799adbbfac4bf");
    xhr.send(null)
    
    
}

function Update(Obj)
{
    var arr = Obj.location_suggestions
    
    var cardgroup = document.getElementById('card_group')
    
    arr.forEach(function(location){
//        console.log(location.title)
//        console.log(location.city_name)
//        console.log(location.country_name)
//        console.log(location.latitude)
//        console.log(location.longitude)
//        console.log(location.entity_type)
         cardgroup.appendChild(createCard(location))
        
    })
    
    document.body.appendChild(cardgroup)
}

function resultcountupdate(count,query)
{
    var div = document.getElementById("result")
    div.innerHTML = count + " results found for '" + query +"'"
}

function createCard(location)
{
    var card = document.createElement('div')
    var color = Color(location.entity_type)
    
    var a1 =  '<div class="card ' + color + ' mt-3 mr-3 ml-3" style="width: 20rem;">'
            +   '<div class="card-body">'
            +      '<h5 class="card-title center2">' + location.title + '</h5><br>'
            +      '<ul class="list-group" style="background-color: #3c3d47">'
            +           '<li class="list-group-item"><strong>City: </strong>' + location.city_name + '</li>'
            +           '<li class="list-group-item"><strong>Country: </strong>' + location.country_name + '</li>'
            +           '<li class="list-group-item"><strong>Latitude: </strong>' + location.latitude + '</li>'
            +           '<li class="list-group-item"><strong>Longitude: </strong>' + location.longitude + '</li>'
            +           '<li class="list-group-item"><strong>Location Type: </strong>' + location.entity_type.charAt(0).toUpperCase() + location.entity_type.slice(1) + '</li>'
            +      '</ul>'
            +   '</div>'
            + '</div>'
    
    card.innerHTML = a1
    
    return card
}      

function Color(obj)
{
    if(obj == 'group')
        return 'bg-primary'
    
    else if(obj == 'city')
        return 'bg-secondary'
    
    else if(obj == 'subzone')
        return 'bg-success'
    
    else if(obj == 'zomato_place')
        return 'bg-warning'
    
    else if(obj == 'landmark')
        return 'bg-danger'
    
    else if(obj == 'zone')
        return 'bg-info'
    
    else if(obj == 'group')
        return 'bg-primary'
    
        
}