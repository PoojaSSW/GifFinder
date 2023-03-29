# GifFinder

## Overview

This is a simple app showing gifs having a capability of searching through them. Used https://developers.giphy.com/docs/api/schema/#gif-object website to fetch the GIF data and load them on the page.

### On load the first set of Gifs seen are from the trending api: api.giphy.com/v1/gifs/trending

Users can search for any kind of gifs by entering an input in the searchbar.

## Interactivity

There are few aspects to this app:

1 Search

2 Pagination(More data loads as user scorlls through the page reaching the bottom, default limit is 20)

3 Modal (click on any gif to view the details of the Gif (title, user, urls)

4 Toggle the Filter section

5 Filter based on RATINGS

6 Sort based on Title (asc and desc) and Time (imported gif time- oldest and latest)


## How the App works:

By Default, on load the most trending gifs are shown. Users can enter any text they wish to see the GIF for.

The app takes the api and loads the relevant results on the page.

On the left side, there are 2 set of filters defined for this app.

  1) Rating Filter: User can choose the GIF based on the Ratings. Examples include Y, G, PG, PG-13 and R

  2) Sort based on Title(A-Z and Z-A) and Imported Gif Time(Oldest and Latest)
  

## Platform 

Web and Mobile. The app is responsive and made to work on different screens of web and mobile platform.

## Mobile

The Mobile interactivity works similar to web, except the modal portion.

## Wireframes

The user experience flow has been sketched before implementing this interface. A set of hand-sketched diagrams (for mobile and web) were crafted and are attached in the "skecthed-wireframes" folder to give an overview of of the thought process that went into designing the app.

## Accessibility 
Support for accessibility provided. It defines the elements when on voice over control. .Attributes used are aria-label, role.


## Tech-stack
Angular (latest version), TypeScript, CSS, HTML


## Build Instructions

#cd GifFinder

NOTE: If you have downloaded the zipped folder, you may get a folder with name:
GifFinder-master. In such case: 

#cd GifFinder-master



#npm install

#ng serve

NOTE: currently the package is running on 

Angular CLI: 15.2.4

Node: 18.12.1

Package Manager: npm 8.19.2


#The project should open at :4200 port: http://localhost:4200/
