var coderbits_badges = (function(){
  function render(target, badges){
    var i = 0, fragment = '<li>', t = $(target)[0];

    for(i = 0; i < badges.length; i++) {
      fragment += '<a href="'+badges[i].link+'" title="'+badges[i].name+'"><img src="'+badges[i].image_link+'" width="65" alt="'+badges[i].name+'" /></a>';
    }

    fragment += '</li>';

    t.innerHTML = fragment;
  }
  return {
    showBadges: function(options){
      $.ajax({
          url: "https://coderbits.com/"+options.user+".json?callback=?"
        , dataType: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var badges = [];
          if (!data || !data.badges) { return; }
          for (var i = 0; i < data.badges.length; i++) {
            if (data.badges[i].earned && data.badges[i].level === 1)
              badges.push(data.badges[i]);
          }
          if (options.count) { badges.splice(options.count); }
          render(options.target, badges);
        }
      });
    }
  };
})();
