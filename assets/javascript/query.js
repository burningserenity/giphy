var topics = ['The Legend of Zelda', 'Earthbound', 'Deus Ex', 'Hotline Miami',
'Morrowind', 'Wolfenstein: The New Order', 'HITMAN', 'Metroid Prime',
'Metal Gear Solid', 'Resident Evil'];

var APIKEY = '&apikey=3ffc17f74efd485bb3e4532cf6e7f2d2';
var queryURL = 'https://api.giphy.com/v1/gifs/search?q=';
var limit = '&limit=10';
var buttSel;

// EXAMPLE: https://api.giphy.com/v1/gifs/search?q=nick+offerman&apikey=3ffc17f74efd485bb3e4532cf6e7f2d2&limit=5

function fillbuttCnt()
{
  $("#buttCnt").empty();
  for (i = 0; i < topics.length; i++)
  {
    $("<button>").attr(
    {
      class: 'btn btn-default mvibutt',
      id: 'mvibutt' + i,
      'data-target': topics[i]
    }).text(topics[i]).appendTo("#buttCnt");
  }
  $(".mvibutt").on('click', select);
}

function getGifs(buttSel)
{
  $.ajax(
  {
    url: queryURL + buttSel + APIKEY + limit,
    method: "GET"
  }).done(function(response)
  {
    console.log(response);
    dispGifs(response);
  });
}

function dispGifs(response)
{
    var results = response.data;

    for (i = 0; i < results.length; i++)
    {
      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var personImage = $("<img>");
      personImage.attr(
      {
        src: results[i].images.fixed_height_still.url,
        'data-still': results[i].images.fixed_height_still.url,
        'data-moving': results[i].images.fixed_height.url,
        'data-state': 'still'
      });

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gifCnt").prepend(gifDiv);
    }
  $("img").on('click', animate);
}

function select(event)
{
  buttSel = $(this).attr('data-target');
  getGifs(buttSel);
}

function search(event)
{
  event.preventDefault();
  var newButt = $('.form-control').val();
  $(".form-control").val("");
  topics.push(newButt);
  fillbuttCnt();
}

function animate(event)
{
  var state = $(this).attr('data-state');
  var stillImage = $(this).attr('data-still');
  var movingImage = $(this).attr('data-moving');
  if (state == 'still')
  {
    $(this).attr('src', movingImage);
    $(this).attr('data-state', 'moving');
  }
  else if (state == 'moving')
  {
    $(this).attr('src', stillImage);
    $(this).attr('data-state', 'still');
  }
}

$(function()
{
  fillbuttCnt();
  $(".search-butt").on('click', search);
});
