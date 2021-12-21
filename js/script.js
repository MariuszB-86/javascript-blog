{   'use strict';

  // document.getElementById('test-button').addEventListener('click', function(){
  //     const links = document.querySelectorAll('.titles a');
  //     console.log('links:', links);
  //   });

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */
    const atributeLink = clickedElement.getAttribute('href');
    console.log('Link z atrybutem href=', atributeLink);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(atributeLink);
    console.log('Artykuł z id ', correctArticle);
  
    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };
    
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';

  const generateTitleLinks = function(customSelector = ''){
    //console.log('To jest funkcja generateTitleLinks');
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);    
    //console.log(titleList);
    titleList.innerHTML = '';

    /* for each article */
    /* find all the articles and save them to variable: articles */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
      /* insert link into titleList */
      //titleList.insertAdjacentHTML("beforeend", linkHTML);
      html = html + linkHTML;
      //console.log(html);
    }   
            
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks(); 

  function calculateTagsParams(tags){
    const params = {
      max : 0,
      min : 999999
    };

    for(tag in tags){
      //console.log(tag + ' is used ' + tags[tag] + ' times');

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    //console.log(params.max);
    //console.log(params.min);
    return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
    
  }

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    console.log(allTags);

    /* find all articles */
    const articleTags = document.querySelectorAll(optArticleSelector);
    //console.log(articleTags);
  
    /* START LOOP: for every article: */
    for(let articleTag of articleTags){
      /* find tags wrapper */
      const tagsWrapper = articleTag.querySelector(optArticleTagsSelector);
      //console.log(tagsWrapper);

      /* make html variable with empty string */
      //let tagsList = '';

      /* get tags from data-tags attribute */
      const tagsList = articleTag.getAttribute('data-tags');
      //console.log(tagsList);

      /* split tags into array */
      const tagsArray = tagsList.split(' ');
      //console.log(tagsArray);

      /* make html variable with empty string */
      let html = '';

      /* START LOOP: for each tag */
      for(let tag of tagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        //console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;

         /* [NEW] check if this link is NOT already in allTags */
         if(!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
         }else {
           allTags[tag]++;
         }
         //console.log(allTags);

        /* END LOOP: for each tag */
      }
      //console.log(html);
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
  
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      //console.log('tagLinkHTML:', tagLinkHTML);
      allTagsHTML += '<li><a href="#tag-' + tag + '" class = ' + tagLinkHTML +'>' + tag + '</a></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };
  
  generateTags();

  const tagClickHandler = function(event){
    console.log('Funkcja tagClickHandler');
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log(tag);
  
    /* find all tag links with class active */
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log(tagActiveLinks);
  
    /* START LOOP: for each active tag link */
    for(let tagActiveLink of tagActiveLinks){
      /* remove class active */
      tagActiveLink.classList.remove('active');
      //console.log(tagActiveLink);

      /* END LOOP: for each active tag link */
    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]'); 
  
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  
  const addClickListenersToTags = function(){
    /* find all links to tags */
    const links = document.querySelectorAll('.list-horizontal a, .tags a');
    //console.log(links);
  
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };
  
  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = {};
    console.log(allAuthors);

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
  
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find author wrapper */
      const authorWrap = article.querySelector(optArticleAuthorSelector);
      //console.log(authorWrap);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      //console.log(articleAuthor);

      /* generate HTML of the link */
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      //console.log(linkHTML);

      /* add generated code to html variable */
      html = linkHTML;

      if(!allAuthors[articleAuthor]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
       }else {
         allAuthors[articleAuthor]++;
       }
       //console.log(allAuthors);

      /* insert HTML of all the links into the author wrapper */
      authorWrap.innerHTML = html;

      /* END LOOP: for every article: */
    }
    const authorList = document.querySelector(optAuthorsListSelector);
    //console.log(authorList);
    
    let allAuthorsHTML = ' ';
    //console.log(allAuthors);
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsHTML += '<li><a href="#author-' + author + '"><span class="author-name">'+ author + '</span>(' + allAuthors[author] + ')</a></li>';
      //console.log(allAuthorsHTML);
    }
    /* [NEW] END LOOP: for each tag in allAuthors: */

    /*[NEW] add HTML from allAuthorsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
  };
  
  generateAuthors();

  const authorClickHandler = function(event){
    console.log('To jest funkcja authorClickHandler');
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(clickedElement);
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
  
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);
  
    /* find all author links with class active */
    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
    //console.log(authorActiveLinks);
  
    /* START LOOP: for each active author link */
    for(let authorActiveLink of authorActiveLinks){
      /* remove class active */
      authorActiveLink.classList.remove('active');
      //console.log(authorActiveLink);

      /* END LOOP: for each active tag link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]'); 
    console.log(authorLinks);
  
    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){
      /* add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };
  
  const addClickListenersToAuthors = function(){
    /* find all links to author */
    const links = document.querySelectorAll('.post-author a, .authors.list a');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };
  
  addClickListenersToAuthors();
}
