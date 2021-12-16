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
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function(){
    //console.log('To jest funkcja generateTitleLinks');
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);    
    //console.log(titleList);
    titleList.innerHTML = '';

    /* for each article */
    /* find all the articles and save them to variable: articles */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

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

  function generateTags(){
    /* find all articles */
    const articleTags = document.querySelectorAll('.post');
    //console.log(articleTags);
  
    /* START LOOP: for every article: */
    for(let articleTag of articleTags){
      /* find tags wrapper */
      const tagsWrapper = articleTag.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */
      let tagsList = '';

      /* get tags from data-tags attribute */
      tagsList = articleTag.getAttribute('data-tags');
      //console.log(tagsList);

      /* split tags into array */
      const tagsArray = tagsList.split(' ');
      //console.log(tagsArray);

      let html = '';
      /* START LOOP: for each tag */
      for(let tag of tagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + tag + '">' + tag + '</a></li> ';
        //console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* END LOOP: for each tag */
      }
      console.log(html);
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
  
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();
}

