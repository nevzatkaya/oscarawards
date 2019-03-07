<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <table class="table borderless">
          <tbody>
            <tr>
              <td>
                <a href="https://nomioscars.firebaseapp.com/">
                  <img class="rounded mx-auto d-block" alt="Oscar" src="./assets/oscar.jpg">
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <a
                      target="_blank"
                      href="https://datahub.io/rufuspollock/oscars-nominees-and-winners"
                    >
                      <img
                        class="rounded mx-auto d-block"
                        alt="Data"
                        style="width:25px;height:28px"
                        src="./assets/data.png"
                      >
                    </a>
                  </div>
                  <div class="col-md-auto">
                    <a target="_blank" href="http://twitter.com/nevzat_kaya" class="fa fa-twitter">
                      <img
                        class="rounded mx-auto d-block"
                        alt="nevzat_kaya"
                        style="width:30px;height:30px"
                        src="./assets/twitter.png"
                      >
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <select
                    id="selectbasic"
                    @change="FilterData"
                    class="custom-select"
                    name="selectbasic"
                    v-model="selectedYear"
                  >
                    <option v-for="item in YearList">{{item}}</option>
                  </select>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row h-100 justify-content-center align-items-center">
        <table class="col-12">
          <tr v-for="item in OrganizedActiveYearMovies">
            <td>
              <table class="table table-bordered table-hover">
                <tbody>
                  <tr>
                    <td>
                      <p class="text-primary font-italic">{{item.Key}}</p>
                    </td>
                  </tr>
                  <tr v-for="item2 in item.Value">
                    <td>
                      <a
                        target="_blank"
                        :href="'https://www.google.com/search?q=' + item2.entity + ' ' + item2.category +' '+ item2.year + ' oscar'"
                      >
                        <p
                          class="text-success font-weight-bold"
                          v-if="item2.winner"
                        >*{{item2.entity}}</p>
                      </a>
                      <span style="color:black" v-if="!item2.winner">{{item2.entity}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      Movies: [],
      ActiveYearMovies: [],
      OrganizedActiveYearMovies: [],
      YearList: [],
      selectedYear: "2018"
    };
  },
  created: function() {
    var i;
    for (i = 1927; i < 2019; i++) {
      this.YearList.push(i);
    }
  },
  beforeMount() {},
  mounted: function() {
    fetch("./oscarawards.json")
      .then(response => response.json())
      .then(data => {        
        this.Movies = data;
        this.ActiveYearMovies = this.Movies.filter(
          item => item.year == this.selectedYear
        );
        this.BindData();
      });
  },

  methods: {
    BindData() {
      let categoriesDistinct = this.ActiveYearMovies.map(
        item => item.category
      ).filter((value, index, self) => self.indexOf(value) === index);

      var dict = [];

      var item_keyvalue;
      for (var i = 0; i < categoriesDistinct.length; i++) {
        item_keyvalue = new Object();
        item_keyvalue.Key = categoriesDistinct[i];
        let list = this.ActiveYearMovies.filter(
          a => a.category == categoriesDistinct[i]
        );
        item_keyvalue.Value = list;

        dict.push(item_keyvalue);
      }

      this.OrganizedActiveYearMovies = dict;
      console.log(this.OrganizedActiveYearMovies);
    },
    FilterData() {
      console.log(this.selectedYear);
      this.ActiveYearMovies = this.Movies.filter(
        item => item.year == this.selectedYear
      );

      this.BindData();
    }
  }
};

</script>

<style>
.borderless tr,
td,
.borderless th {
  border: none;
}
</style>
