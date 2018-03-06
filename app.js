$(document).ready(function(){

var obj = {
        qStr: "",
        count: 0,
        fields: {
            searchTerm: '',
            numberRecords:'',
            startYear:'',
            endYear:''
        },
        parms: {
            'api-key': "c55851da8c4a4546a1d3541feb1cdd46",
            'q': "",
            'begin_date': "",
            'end_date': ""
        },
        url: "",
        getUrl: function()
        {
            this.url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

            //get string for all param
            $.each(this.params, function(key, value) {
                if (value != "")
                {
                    this.url += key + '=' + value;
                }
            })
            
        },
        getAJAX: function()
        {
            $.ajax({
                url: this.url,
                method: 'GET',
            }).then(function(result) {
                var docs = result.response.docs,
                    thisDoc = {                     
                        title:"",
                        author:"",
                        pubDate:"",
                        url:"",
                    },
                    
                // loop through all docs
                for (var i =0; i < docs.length; i++)
                {
                    title = docs[i].headline.main;
                    author = docs[i].byline.original;
                    pubDate = docs[i].pubDate;
                    url = docs[i].web_url;
                }
            })
        },
        getArticleHTML: function(docObj)
        {
            $('#qSum').html(`<div class="row">
                                    <div class = "left">
                                        <b>Question:</b> ${this.qIndx + 1} of ${this.qBank.length} 
                                    </div>
                                    <div class = "center">
                                        <b>Category:</b> ${qObj.category}
                                    </div>
                                    <div class = "right">
                                        <b>Difficulty:</b> ${qObj.difficulty} 
                                    </div>                                    
                                </div>`);
        }
    }

    $('#search').on('click', function(){
        $.each(obj.fields, function(key, value) {
            this.fields[key] = $('#' + key).val();
        })
    })

});

