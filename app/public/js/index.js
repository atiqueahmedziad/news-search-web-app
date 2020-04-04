$('#search-form-all').trigger('reset');
$('#search-form-top').trigger('reset');

$('#country, #category').on('change', () => {
  let country = $('#country').val();
  let category = $('#category').val();
  if(!country.trim() && !category.trim()){
    $('select#sources_top').prop("disabled", false);
    $('select#sources_top').formSelect();
  } else {
    console.log('asd');
    $('select#sources_top').prop("disabled", true);
    $('select#sources_top').formSelect();
  }
});

$('#sources_top').on('change', () => {
  let sources = $('#sources_top').val();
  if(!sources.length){
    $('select#country, select#category').prop("disabled", false);
    $('select#country, select#category').formSelect();
  } else {
    console.log('basd');
    $('select#country, select#category').prop("disabled", true);
    $('select#country, select#category').formSelect();
  }
});

$('#search-form-all').submit(e => {
  let query = $('input#search').val();
  if(!query.trim()){
    return false;
  } else {
    return;
  }
});

$('#search-form-top').submit(e => {
  let query = $('input#search_top').val();
  let sources = $('#sources_top').val();
  let country = $('#country').val();
  let category = $('#category').val();

  if(!query.trim() && !sources.length && !country.trim() && !category.trim()){
    return false;
  } else {
    return;
  }
});
