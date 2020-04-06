$('#api-key-form').submit(e => {
  e.preventDefault();
  const apiKey = $('#api_key').val();
  $('#error').html(`<p>Checking...</p>`);
  $.post('/checkApi', {apiKey}, checkValid);
});

checkValid = data => {
  if(data.message){
    let error  = `<p class="red-text red-darken-4">${data.message}</p>`;
    $('#error').html(error);
  } else if(data.status == 'ok'){
    let error  = `<p class="green-text text-darken-4">success :-)</p>`;
    $('#error').html(error);
    window.location.href = '/';
    return false;
  }
}
