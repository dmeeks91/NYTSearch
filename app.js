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
            'q': "",
            'begin_date': "",
            'end_date': ""
        },
        url: "",
        getUrl: function()
        {
            this.url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" +
                        "api-key=c55851da8c4a4546a1d3541feb1cdd46";
            
            //get string for all param
            $.each(this.params, function(key, value) {
                if (value != "")
                {
                    this.url += '&' + key + '=' + value;
                }
            })
            
        },
        getAJAX: function(url)
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
                    };
                    
                // loop through all docs
                for (var i =0; i < obj.fields.numberRecords; i++)
                {
                    thisDoc.title = docs[i].headline.main;
                    thisDoc.author = docs[i].byline.original;
                    thisDoc.pubDate = docs[i].pub_date;
                    thisDoc.url = docs[i].web_url;
                    obj.getArticleHTML(thisDoc);
                }
            })
        },
        getArticleHTML: function(docObj)
        {
            $('#articleHeader').append(`<div class="row articleRow">
                                            <div class="title">${docObj.title}</div>
                                            <div class="content subSect">
                                                <div class="author">${docObj.author}</div>
                                                <div class="date">${docObj.pubDate}</div>
                                                <a target="blank" href="${docObj.url}" 
                                                    class ="url">${docObj.url}</a>
                                            </div>
                                        </div>`);
        },
        getFormData: function()
        {
            var self = this;
            return new Promise(
                function(resolve, reject) {
                    try 
                    {
                        $.each(obj.fields, function(key, value) {
                            self.fields[key] = $('#' + key).val();
                        }); 

                        self.parms['q'] = (self.fields['searchTerm']!='') ? self.fields['searchTerm'] : '';
                        self.parms['begin_date'] = (self.fields['startYear']!='') ? (self.fields['startYear'] + '0101') : '';
                        self.parms['end_date'] = (self.fields['endYear'] !='') ? (self.fields['endYear'] + '1231') : '';
                        
                        resolve(true);
                    }
                    catch(e)
                    {
                        reject(false);
                    }                        
                });           
            
        }
    }

    $('#search').on('click', function(e){
        event.preventDefault();
        obj.getFormData().then(function(e) {
            obj.getAJAX(obj.getUrl());
        });           
    })

});

