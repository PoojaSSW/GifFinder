import { Component, HostBinding, HostListener } from '@angular/core';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "FindYourGif";
  searchLink = "http://api.giphy.com/v1/gifs/search?api_key=Y6YCsgrSbs6G6Tmgjw4S7oAHPPLmBZ7F&q=";
  onLoadURL = "http://api.giphy.com/v1/gifs/trending?api_key=Y6YCsgrSbs6G6Tmgjw4S7oAHPPLmBZ7F";
  http: Http;
  giphyData: any[] = [];
  data: any[] =[];
  type: string = 'gif';
  sort: string = "asc";
  inputValue: string;
  ratingsFilter: any[] = [
    {id:1, name: 'Y', isSelected: true },
    {id:2, name: 'G', isSelected: true },
    {id:3, name: 'PG', isSelected: true },
    {id:4, name: 'PG-13', isSelected: true },
    {id:5, name: 'R', isSelected: true }
  ];
  typeOpts: any[] =[
    { value: 'gif', label: 'Gif' },
    { value: 'still', label: 'Still' }
  ];
  sortOpts: any[] =[
    { value: 'asc', label: 'Title (A-Z)' },
    { value: 'desc', label: 'Title (Z-A)' },
    { value: 'new', label: 'Most Recent' },
    { value: 'old', label: 'Oldest Frist' },
  ];
  isMobile: boolean;
  showDropdown = false;
  showSortDropdown = false;
  showModal = false;
  modalData: any;
  showFilterSection = true;

  constructor(http: Http) {
     this.http = http;
     this.type = this.type;
     this.sort = this.sort;
     this.inputValue = "";
     this.isMobile = false;
  }
  /* initialization of data on page load
      On page load the default set of data images seen are the most trending images.
      url: https://developers.giphy.com/docs/api/endpoint/#trending
  */
  ngOnInit() {
    this.http.request(`${this.onLoadURL}&offset=0&limit=20`).subscribe((res: Response) => {
       this.data = res.json().data;
       this.giphyData = this.data?.sort((a, b) => (b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1));;
       this.isMobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // to check for mobile devices
    });
  }
  /* Added a functionality for browser resize
     When browser resizes to smaller version for mobile, this function is triggered 
  */
  @HostBinding('class.mobile')
  get isMobileClass() {
    return this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { 
    this.isMobile = window.innerWidth < 768; // this is the mobile breakpoint width assumed.
  }

  /* Added this functionality for pagination.
  By default 20 is the limit on first load, when user scrolls through the page, 
  the offset gets updated based on the length of data and more records are fetched. 
  */
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    if (scrollPosition >= bodyHeight - windowSize) {
      this.loadMoreData();
    }
  }

  loadMoreData() {
    const offset = this.giphyData.length;
    const limit = 10;
    this.http.request(`${this.onLoadURL}&offset=${offset}&limit=${limit}`).subscribe((res: Response) => {
       let respJsonData = res.json().data;
       this.giphyData = [...this.giphyData, ...respJsonData];
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.showSortDropdown= false;
  }

  toggleSortDropdown () {
    this.showSortDropdown = !this.showSortDropdown;
    this.showDropdown = false;
  }

  onSubmit() {
    if (!this.inputValue || this.inputValue === "") {
      return this.ngOnInit();
    }
    var apiLink = this.searchLink + this.inputValue;
    this.http.request(apiLink).subscribe((res: Response) => {
       this.giphyData = res.json().data;
    });
  }

  onSortChange(){
    let sort = this.sort;
    switch(sort) {
      case "desc":
        this.giphyData?.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
        break;
      case "new":
        this.giphyData?.sort((a, b) => (a.import_datetime < b.import_datetime ? 1 : -1));
        break;
      case "old":
        this.giphyData?.sort((a, b) => (b.import_datetime < a.import_datetime ? 1 : -1));
        break;
      default:
        this.giphyData?.sort((a, b) => (b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1));
        break;
    }
    this.showSortDropdown = false;
    return this.giphyData
  }
  onClickRatingsApply() {
    let newRatingsArray: any[] = [];
    this.ratingsFilter.filter(item => item.isSelected).map(item => {
      newRatingsArray.push(this.data?.filter(i=>i.rating === item.name.toLowerCase()))
    });
    this.showDropdown = false;
    this.giphyData = newRatingsArray?.flat();
  }
  onCheckboxChange(checked?: boolean, name?: string, value?: string) {
    this.giphyData = checked ? 
      this.giphyData?.concat(this.data?.filter(i=>i.rating === value?.toLowerCase())) 
    : this.giphyData?.filter(i=>i.rating !== value?.toLowerCase());
  }

  toggleModalVisibility (g: any) :void {
    this.modalData = g;
    this.showModal = !this.showModal;
  }

  toggleSideFilters() {
    this.showFilterSection = !this.showFilterSection;
  }
  
  close() {
    this.showModal = false;
  }
}


