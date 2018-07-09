$(document).ready(function(){
$('.btn-view-job').click(function(){
    event.stopPropagation();
    var id = $(this).data('job-id');
    var title = $(this).data('job-title');

    var href = `/job/${id}/${slugify(title)}`;
    $('iframe').attr('src', href);
    $('iframe').show(100);
})
$('body').click(function(){
    $('iframe').hide(100);
});
$('iframe').click(function(event ){
    event.stopPropagation();
})
});

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
