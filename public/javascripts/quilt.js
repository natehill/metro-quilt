
    $("#logo").append('<img src="images/metro-logo.png" />')
    $(".academic").append('academic<br />libraries');
    $(".special").append('special<br />libraries');
    $(".hospital").append('hospital<br />libraries');
    $(".public").append('public<br />libraries');
    $(".archives").append('archives');
    $(".museum").append('museum<br />libraries');
    $(".historical").append('historical<br />societies');
    $(".others").append('others');
    // define an array for the records
    accumulator = [];
    // define an associative array for the same
    accumuhash = {};

// array index
    index = 0;

    // set up Airtable
    const Airtable = require('airtable');
    const base = new Airtable({apiKey: 'key2ipbVKoA0cfQMH'}).base('appdfIU0XwZoKc3I9');

    // page through the records and push them onto an array.
    // sort the records before retrieval.
    base('Institutional Members').select({
	sort: [{
	    field: 'Institution Name',
	    direction: 'asc'
	}]
	// get a page of records
    }).eachPage(function page(records, fetchNextPage) {
	// process a single record
	records.forEach(function (record) {
	    // write a message to the console. Unneccessary, but we can.
	    //console.log('Retrieved ', record.get('Institution Name') + record.get('Membership Category'));
	    // push the json for the fields onto the array.
	    // this will result in an array of associative arrays.
	    accumulator.push(record._rawJson.fields);
	    // add an entry to the assoc array with a key of the institution name.
	    accumuhash[record.get('Institution Name')] = record._rawJson.fields;
	});
	// grab the next page.
	fetchNextPage();

    }, function done(error) {
	// print an error message if there was an error.
	if(error) {
	    console.log(error);
	} else {
	    // otherwise loop through the array and output a couple fields for each record.
      var myData = accumulator;
      //console.log(myData);

      $( "#academic-libraries" ).click(function() {
          var acMember = d3.selectAll("div[orgtype='academic library']")
          acMember.classed("orange", !acMember.classed("orange"), !acMember.classed("white-block"));
        });

      $( "#special-libraries" ).click(function() {
          var specMember = d3.selectAll("div[orgtype='special library']")
          specMember.classed("magenta", !specMember.classed("magenta"), !specMember.classed("white-block"));
        });

      $( "#hospital-libraries" ).click(function() {
          var hospMember = d3.selectAll("div[orgtype='hospital / medical library']")
          hospMember.classed("lavender", !hospMember.classed("lavender"), !hospMember.classed("white-block"));
        });

      $( "#public-libraries" ).click(function() {
          var pubMember = d3.selectAll("div[orgtype='public library']")
          pubMember.classed("red", !pubMember.classed("red"), !pubMember.classed("white-block"));
        });

      $( "#archives" ).click(function() {
          var archMember = d3.selectAll("div[orgtype='archive']")
          archMember.classed("purple", !archMember.classed("purple"), !archMember.classed("white-block"));
        });

      $( "#museum-libraries" ).click(function() {
          var musMember = d3.selectAll("div[orgtype='museum library']")
          musMember.classed("blue", !musMember.classed("blue"), !musMember.classed("white-block"));
        });

      $( "#historical-societies" ).click(function() {
          var histMember = d3.selectAll("div[orgtype='historical society']")
          histMember.classed("darkblue", !histMember.classed("darkblue"), !histMember.classed("white-block"));
        });

      $( "#other" ).click(function() {
          var otherMember = d3.selectAll("div[orgtype='other']")
          otherMember.classed("yellow", !otherMember.classed("yellow"), !otherMember.classed("white-block"));
        });

      $('#logo').css('cursor', 'pointer');

      $('#logo').click(function() {
        location.reload();
      });

	    while(index < accumulator.length) {
        d3.selectAll("#target")
          .append("div")
          .attr("class", "black-block organization")
          .attr("name", accumulator[index]['Institution Name'])
          .attr("orgtype", accumulator[index]['Type'])
          .attr("member-type", accumulator[index]['Membership Category'])
          .attr("address-1", accumulator[index]['Address 1'])
          .attr("address-2", accumulator[index]['Address 2'])
          .attr("city", accumulator[index]['City'])
          .attr("state", accumulator[index]['State'])
          .attr("zip", accumulator[index]['Zip Code'])
          .attr("link", accumulator[index]['website']);
		    index++;
	    }


      function navMouseover(){
        d3.selectAll(".thumbnail")
          .on('mouseover', function(d, i) {
              d3.select(this)
              .transition()
              .style('opacity', '0.2')
              .style('cursor', 'pointer');
              })
          .on('mouseout', function(d, i) {
              d3.select(this)
              .transition()
              .style('opacity', '1');
              })
            };

      navMouseover();

      function orgMouseover(){
        d3.selectAll(".black-block")
          .on('mouseover', function(d, i) {
              d3.select(this)
              .transition()
              .style('opacity', '0.5')
              .style('cursor', 'pointer');
              })
          .on('mouseout', function(d, i) {
              d3.select(this)
              .transition()
              .style('opacity', '1');
              })
            };

        orgMouseover();

        $("#target .black-block").one('click', function () {

            var name = $(this).attr("name");
            var orgtype = $(this).attr("orgtype");
            var memtype = $(this).attr("member-type");
            var address1 = $(this).attr("address-1");
            var address2 = $(this).attr("address-2");
            var city = $(this).attr("city");
            var state = $(this).attr("state");
            var zip = $(this).attr("zip");
            var link = $(this).attr("link");



            var googleAddress = ('https://www.google.com/maps/place/')+address1.split(' ').join('+')+('+')+city.split(' ').join('+')+('+')+state.split(' ').join('+')+('+')+zip;

            d3.select(this)
            .on('mouseover', function(d, i) {
                d3.select(this)
                .style('opacity', '1');
                })
            $(this).css('z-index', 2);
            $(this).css('cursor', 'default');
            $(this).siblings('div').css('z-index', 1);
            $(this).addClass("white-block").removeClass("black-block");
            $(this).append( '<div id="org-content"><div id="closeit"><i class="fa fa-close"></i></div><div><h2><a href="' + link + '" target="blank">' + name + '</a></h2></div>' + '<div><h3>' + orgtype + '</h3></div>'  + '<div class="memtype">METRO ' + memtype + ' member</div>' + '<div>' + address1 + '</div>' + '<div>' + city + ', ' + state + ' ' + zip + '</div>' + '<div class="maplink"><a href="' + googleAddress + '" target="blank">Map</a></div>' + '</div>');
            $('#closeit').css('float', 'right').css('cursor', 'pointer');
            $( "#closeit" ).click(function() {
              $(this).parent().parent().addClass("black-block").removeClass("white-block").empty('#org-content');
              orgMouseover();
            });
          });
	}



    });
