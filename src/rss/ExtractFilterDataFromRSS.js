import { upworkRSS } from "../rss/upwork";

/** global job list variable with extracted item data **/
export let customJobItemsList = [];

//Business Logic Behind Extracting Filter Data from the RSS Feed Text
    const useFilterDataFromRSS = async () => {
        
        const response = await upworkRSS;
        console.log(response);
        let jobItems = response.items; //[0: {},]
        console.log(jobItems);

      //**** algorithm to parse each job item's RSS text into label/description pairs, so that they can be read by the job filters ****/

        //each paragraph tag corresponds to a jobItem
        let paragraphList = [];
        paragraphList = document.getElementsByTagName('p'); 
        console.log(paragraphList);

        //generate data list of filter labels and descriptions from DOM : labelList = {label: "Budget", description: "$1,500"}]
        let labelList = {label: [], description: []};
        for ( let i=0; i < paragraphList.length; i++) {
          for (let j=0; j < paragraphList[i].childNodes.length; j++) {
          if(paragraphList[i].childNodes[j].nodeName === "B") {   
            labelList.label.push(
                      paragraphList[i].childNodes[j].innerText.replace(/\s+/g, "")) //remove white space   
            continue;
          }
          if(paragraphList[i].childNodes[j].nodeName === "#text" &&
             paragraphList[i].childNodes[j].previousSibling &&
             paragraphList[i].childNodes[j].previousSibling.nodeName === "B"
          ) {
            labelList.description.push(paragraphList[i].childNodes[j].data)
          }
        }
      }
      //console.log(labelList);

        //match label and description in the same object: labelMatchList = [{ "hourlyRange" : "$15.00-$35.00"}]
        let labelMatchList = [];
        for ( let k = 0; k < labelList.label.length; k++ ) {
            labelMatchList.push({ [labelList.label[k]] : labelList.description[k] });
        }
        //console.log(labelMatchList);

        //chunk label array into subarrays, divided at each job item point, achieved by cutting arrays between the Country keys, an inflection point
        let sliceIndex = [0];
        labelMatchList.map((label, i) => {
          if ( Object.keys(label)[0] === "Country") {
            sliceIndex.push(i); // index of every "Country" label key: [0, 5, 10, 16...167]
          }
        })

        //need job item subarray slices of index 0 to (and including) 5, 6 to 10, 11 to 16, 17 to 23
        let startArray = [];
        let endArray = [];
        let startIndex = 0;
        let endIndex = 0;
        sliceIndex.map((slice, i)=> {
          if ( slice === 0) {
            startIndex= 0;
          } else {
            startIndex = slice+1; 
            endIndex = slice+1;
          }
          startArray.push(startIndex);
          endArray.push(endIndex);
        })
        startArray.pop(); //remove last element
        endArray.shift(); //remove first element

        //with the job item subarrays, we need to create separate array items for each job item, to then push them to the jobItems array
        // [0: [{Hourly : "$20-$30"}, {datePosted : January 7}], 1: [{Location: United States}]]
        let filterLabelsArray= [];
        //let filterLabelsObject= {};
        startArray.map((start, i) => {
          return filterLabelsArray.push(labelMatchList.slice(start,endArray[i]));
          //filterLabelsObject = {...filterLabelsArray};
        })
        //console.log(filterLabelsArray);

        //building custom job items list as a nested array to contain data object pairs
        //let customJobItemsList = [];
        jobItems && jobItems.map((item, i) => customJobItemsList.push([]))
        jobItems && jobItems.map((item, i) => {
            customJobItemsList[i].push( 
            {title: item.title,
            datePosted: item.isoDate,
            postContent: item.content,
            link: item.link,
            filterLabelsArray: filterLabelsArray[i]} //filter labels [0: {label: description}, 1: {label:description}] -- indexes are linked to the filter labels
          )
        })
        console.log(customJobItemsList);
       
        /**** assigning and cleaning variables for reading in filters ****/
        let hourlyRangeMap = new Map()
        let fixedPriceMap = new Map()
        let skillsMap = new Map()
        let locationMap = new Map()
        let categoryMap = new Map()
        //use RSS provided isoDate data point for date
        let skillsArray = [];
        let jobType = "Hourly";

        for (let i = 0; i < customJobItemsList.length; i++) { //loop through each job item
          for (let j=0; j < filterLabelsArray[i].length; j++) { //loop through each filter label in each job item
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "HourlyRange") {
              let hourlyRange = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ": $19.00-$46.00"
              let hourlyRangeLow = parseInt(hourlyRange.slice(3,8)); // convert string into workable integer
              let hourlyRangeHigh = parseInt(hourlyRange.slice(10));
              jobType = "Hourly";
              hourlyRangeMap.set( i, { jobType: jobType, lowPrice: hourlyRangeLow, highPrice: hourlyRangeHigh}); 
            }
              //[0: {jobItem5 => {jobType : hourly, lowPrice : 15, highPrice : 45}}] jobItem is the key, the object is the value

            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Budget") {
                let fixedPrice = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ": $600"
                fixedPrice = fixedPrice.slice(3); // "600"
                fixedPrice = parseInt(fixedPrice.replace(/,/g, '')); //handles comma separators: "20,000" => 20000
                jobType = "Fixed Price";
                //fixedPriceArray.push({[i] : [jobType, fixedPrice]}); // [{job item number : [jobType, fixed price]}]
                fixedPriceMap.set( i, { jobType: jobType, price: fixedPrice});
              }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Skills") {
                let skills = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ":React, Sass, Typescript"
                let skillsStringClean = skills.slice(1); // removes starting colon: "React, Sass, Typescript"
                skillsStringClean = skillsStringClean.split('     ').join(''); //removes large white space from between words
                skillsStringClean = skillsStringClean.trimEnd(); // remove white space at end of string
                skillsArray = skillsStringClean.split(","); //creates an array of the string list
                skillsArray = skillsArray.filter(s => !s.includes("employees")); //removes company size info from skills array
                skillsMap.set(i, { skills: skillsArray});
            }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Country") {
              let location = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0];
              location = location.slice(2, -1); //removes starting colon and ending space: "United States"
              locationMap.set(i, { location: location });
            }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Category") {
              let category = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0];
              category = category.slice(2);
              categoryMap.set(i, { category: category });
            }
          }
        }

        //combining all parsed Map filter values under one cohesive jobs list
        for ( let i = 0; i < customJobItemsList.length; i++) {
            for (let [key, value] of hourlyRangeMap) {
                if (key === i) {
                    customJobItemsList[i].push({hourlyRange : value})
                    //customJobItemsList[i][1].hourlyRange.jobType;
                }
            }
            for (let [key, value] of fixedPriceMap) {
                if (key === i) {
                    customJobItemsList[i].push({fixedPrice : value})
                    //customJobItemsList[i][1].fixedPrice.jobType;
                }
            }
            for (let [key, value] of skillsMap) {
                if (key === i) {
                    customJobItemsList[i].push(value)
                    //customJobItemsList[i][2].skills.skills;
                } 
            }
            for (let [key, value] of locationMap) {
                if (key === i) {
                    customJobItemsList[i].push(value)
                    //customJobItemsList[i][3].location.location;
                }
            }
            for (let [key, value] of categoryMap) {
                if (key === i) {
                    customJobItemsList[i].push(value)
                    //customJobItemsList[i][4].category.category;
                }
            }
        }

        //combine every object under one job items list: [0: {{} ,  {}}, 1: {{}, {}}...]
        for ( let i = 0; i < customJobItemsList.length; i++) {
                customJobItemsList[i] = Object.assign(customJobItemsList[i][0], customJobItemsList[i][1], customJobItemsList[i][2], customJobItemsList[i][3], customJobItemsList[i][4], customJobItemsList[i][5])
    }
    //console.log(customJobItemsList);
    
    //add in empty/default values to handle empty objects and undefined error
    for ( let i = 0; i < customJobItemsList.length; i++) {
        if (!customJobItemsList[i].hourlyRange) {
            customJobItemsList[i] = Object.assign(customJobItemsList[i], {hourlyRange: {jobType: "", lowPrice: "", highPrice:""}})
        }
        if (!customJobItemsList[i].fixedPrice) {
            customJobItemsList[i] = Object.assign(customJobItemsList[i], {fixedPrice: {jobType: "", price: ""}})
        }
        if (!customJobItemsList[i].skills) {
            customJobItemsList[i] = Object.assign(customJobItemsList[i], {skills: []})
        }
        if (!customJobItemsList[i].category) {
            customJobItemsList[i] = Object.assign(customJobItemsList[i], {category: ""})
        }
        if (!customJobItemsList[i].location) {
            customJobItemsList[i] = Object.assign(customJobItemsList[i], {location: ""})
        }
    }
    console.log(customJobItemsList);
    
    return customJobItemsList; 
    //iterable list of job items, .map ((item, i) => item.filterName.subFilter))
    //item.hourlyRange.lowPrice, item.fixedPrice.price, item.skills, item.category, item.location, item.datePosted)
    }

    export default useFilterDataFromRSS;

