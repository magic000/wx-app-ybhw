//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    selectData: [ '3', '4', '5', '6', '7', '8 '], //下拉列表的数据
    show_r: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index_r: 0,
    show_c: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index_c: 0,

    selectDataX: ['1','2','3'], //下拉列表的数据
    selectDataY: ['1','2','3'], //下拉列表的数据
    show_x: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index_x: 0,
    show_y: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index_y: 0,



    image_f1_src: "../image/hui.png",
    image_0_src: "../image/-1.png",

    image_lr_src: "../image/l-r.png",
    image_ud_src: "../image/u-d.png",

    image_lu_src: "../image/l-u.png",
    image_ld_src: "../image/l-d.png",
    image_ru_src: "../image/r-u.png",
    image_rd_src: "../image/r-d.png",

    image_line_arr: [
      [-1, 1, 1, 0, 0],
      [6, -1, 1, 2, 4],
      [7, 1, -1, 3, 5],
      [8, 2, 3, -1, 0],
      [9, 4, 5, 0, -1]
    ],
    image_line_srcs: ["../image/l-r.png", "../image/u-d.png", "../image/l-u.png", "../image/l-d.png", "../image/r-u.png", "../image/r-d.png",
           "../image/end-u.png", "../image/end-d.png", "../image/end-l.png", "../image/end-r.png",],

    cnt: 0,
    r: 3,
    c: 3,
    sx: 1,
    sy: 1,
    arr: [],
    images: [],
    butVal: "开始计算",

  },


  //事件处理函数

  // 点击下拉列表 选择行列数
  selectTapR() {
    this.setData({
      show_r: !this.data.show_r
    });
  },
  optionTapR(e) {
    var Index = e.currentTarget.dataset.index //获取点击的下拉列表的下标
    var selectDataX = new Array()
    for (var i = 1; i <= this.data.selectData[Index]; i++) {
      selectDataX[i - 1] = i
    }

    this.setData({
      index_r: Index,
      r: this.data.selectData[Index],
      show_r: !this.data.show_r,
      selectDataX: selectDataX
    });
    this.onLoad()
  },

  // 点击下拉列表 选择行列数
  selectTapC() {
    this.setData({
      show_c: !this.data.show_c
    });
  },
  optionTapC(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    var selectDataY = new Array()
    for (var i = 1; i <= this.data.selectData[Index]; i++) {
      selectDataY[i - 1] = i
    }

    this.setData({
      index_c: Index,
      c: this.data.selectData[Index],
      show_c: !this.data.show_c,
      selectDataY: selectDataY
    });
    this.onLoad()
  },


  // 点击下拉列表  选择起始点位置
  selectTapX() {
    this.setData({
      show_x: !this.data.show_x
    });
  },
  optionTapX(e) {
    var Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    var sx_tmp = Number(this.data.selectDataX[Index])
    
    var arr_index = "arr[" + (sx_tmp-1) + "][" + (this.data.sy-1) + "]"
    var image_index = "images[" + (sx_tmp-1) + "][" + (this.data.sy-1) + "]";

    this.setData({
      index_x: Index,
      sx: sx_tmp,
      show_x: !this.data.show_x,
      [arr_index]: 0,
      [image_index]:  this.data.image_0_src
    });

  },

  // 点击下拉列表 选择起始点位置
  selectTapY() {
    this.setData({
      show_y: !this.data.show_y
    });
  },
  optionTapY(e) {
    var Index = e.currentTarget.dataset.index //获取点击的下拉列表的下标
    var sy_tmp = Number(this.data.selectDataY[Index])
    
    var arr_index = "arr[" + (this.data.sx-1) + "][" + (sy_tmp-1) + "]"
    var image_index = "images[" + (this.data.sx-1) + "][" + (sy_tmp-1) + "]";

    this.setData({
      index_y: Index,
      sy: sy_tmp,
      show_y: !this.data.show_y,
      [arr_index]: 0,
      [image_index]:  this.data.image_0_src
    });

  },



  // 点击 图标
  bindImageBlur: function(event) {
    var arrsp = event.currentTarget.id.split(",")
    var i = parseInt(arrsp[0])
    var j = parseInt(arrsp[1])

    // 行列数 范围外 点击无效
    if(i>=this.data.r||j>=this.data.c){
      return
    }
    // 起始点 点击无效
    if(i==this.data.sx-1&&j==this.data.sy-1){
      return
    }
    

    var arr_index = "arr[" + i + "][" + j + "]"
    var arr_val
    if (this.data.arr[i][j] != -1) {
      arr_val = -1
    } else {
      arr_val = 0

    }

    var image_index = "images[" + i + "][" + j + "]";
    var image_val
    if (this.data.images[i][j] != this.data.image_f1_src) {
      image_val = this.data.image_f1_src
    } else {
      image_val = this.data.image_0_src

    }
    this.setData({
      [arr_index]: arr_val,
      [image_index]: image_val
    });

  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    // console.log("arr==", this.data.r, this.data.c)
    var arr = []
    var images = []
    for (var i = 0; i < 8; i++) {
      this.data.arr[i] = new Array()
      this.data.images[i] = new Array()
      for (var j = 0; j < 8; j++) {
        this.data.arr[i][j] = 0
        this.data.images[i][j] = this.data.image_f1_src
      }
    }


    for (var i = 0; i < this.data.r; i++) {
      for (var j = 0; j < this.data.c; j++) {
        this.data.arr[i][j] = 0
        this.data.images[i][j] = this.data.image_0_src
      }
    }
    arr = this.data.arr
    images = this.data.images
    this.setData({
      arr: arr,
      images: images
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  set_field_num: function(arr, x, y) {
    if (x < 0 || y < 0 || x >= this.data.r || y >= this.data.c) {
      return
    }
    if (arr[x][y] != 0) {
      return
    }
    arr[x][y] = 1
    this.set_field_num(arr, x - 1, y)
    this.set_field_num(arr, x + 1, y)
    this.set_field_num(arr, x, y - 1)
    this.set_field_num(arr, x, y + 1)

  },
  check_field_num: function(arr) {
    var tmp = new Array()
    for (var i = 0; i < this.data.r; i++) {
      tmp[i] = new Array()
      for (var j = 0; j < this.data.c; j++) {
        tmp[i][j] = arr[i][j]
      }
    }
    var num = 0
    for (var i = 0; i < this.data.r; i++) {
      for (var j = 0; j < this.data.c; j++) {
        if (tmp[i][j] == 0) {
          this.set_field_num(tmp, i, j)
          num++
        }
      }
    }
    if (num >= 2) {
      return false
    }
    return true
  },


  // 计算 (i,j) 周围是有只有一个没走的点
  check_num: function(arr, i, j) {
    if (i < 0 || j < 0 || i >= this.data.r || j >= this.data.c) {
      return false
    }
    if (arr[i][j] != 0) {
      return false
    }
    var err = 0
    if (i - 1 >= 0 && arr[i - 1][j] == 0) {
      err++
    }

    if (j - 1 >= 0 && arr[i][j - 1] == 0) {
      err++

    }
    if (i + 1 < this.data.r && arr[i + 1][j] == 0) {
      err++

    }
    if (j + 1 < this.data.c && arr[i][j + 1] == 0) {
      err++
    }

    if (err < 2) {
      return true
    }
    return false
  },

  check: function(arr, x, y) {
    var err = 0
    for (var i = 0; i < this.data.r; i++) {
      for (var j = 0; j < this.data.c; j++) {
        if (arr[i][j] == 0) {
          if (i - 1 >= 0 && arr[i - 1][j] == 0) {
            continue
          }
          if (j - 1 >= 0 && arr[i][j - 1] == 0) {
            continue
          }
          if (i + 1 < this.data.r && arr[i + 1][j] == 0) {
            continue
          }
          if (j + 1 < this.data.c && arr[i][j + 1] == 0) {
            continue
          }

          err++

          if (i == x) {
            if (j == y - 1 || j == y + 1) {
              err--
            }
          }
          if (j == y) {
            if (i == x - 1 || i == x + 1) {
              err--
            }
          }
          if (err >= 1) {
            return false
          }
        }
      }
    }
    return true
  },

  // 开始计算路径
  step: function(arr, x, y, s) {
    this.data.cnt++
      if (((new Date()).getTime() - this.data.start_time) > 10000) {
        console.log("cnt:", this.data.cnt, ", time:", (new Date()).getTime() - this.data.start_time)
        // var tmp = new Array()
        // for (var i = 0; i < this.data.r; i++) {
        //   tmp[i] = new Array()
        //   for (var j = 0; j < this.data.c; j++) {
        //     tmp[i][j] = arr[i][j]
        //   }
        // }
        //   console.log("timeout", this.data.cnt, tmp)
        return false
      }

    if (x < 0 || y < 0 || x >= this.data.r || y >= this.data.c) {
      return false
    }
    if (arr[x][y] != 0) {
      return false
    }
    arr[x][y] = ++s
    if (s == this.data.r * this.data.c) {
      return true
    }
    if (!this.check(arr, x, y)) {
      arr[x][y] = 0
      s--
      return false
    }

    if (!this.check_field_num(arr)) {
      arr[x][y] = 0
      s--
      return false
    }

    // 假如周围有 必须先走的点, 先走它 
    var check_flag_up = this.check_num(arr, x - 1, y)
    var check_flag_down = this.check_num(arr, x + 1, y)
    var check_flag_left = this.check_num(arr, x, y - 1)
    var check_flag_right = this.check_num(arr, x, y + 1)
    // console.log("flag", check_flag_up, check_flag_down, check_flag_left, check_flag_left)


    if (check_flag_up && this.step(arr, x - 1, y, s)) {
      return true
    } else if (check_flag_down && this.step(arr, x + 1, y, s)) {
      return true
    } else if (check_flag_left && this.step(arr, x, y - 1, s)) {
      return true
    } else if (check_flag_right && this.step(arr, x, y + 1, s)) {
      return true
    } else if (check_flag_up || check_flag_down || check_flag_left || check_flag_right) {
      arr[x][y] = 0
      s--
      return false
    }


    if (this.step(arr, x - 1, y, s)) {
      return true
    } else if (this.step(arr, x + 1, y, s)) {
      return true
    } else if (this.step(arr, x, y - 1, s)) {
      return true
    } else if (this.step(arr, x, y + 1, s)) {
      return true
    } else {
      arr[x][y] = 0
      s--
    }
    return false
  },

   printResult_2_forward: function(arr, x, y, d) {
    if (x < 0 || y < 0 || x >= this.data.r || y >= this.data.c) {
      return 0
    }
    if (x - 1 >= 0 && arr[x - 1][y] - arr[x][y] == d) {
      return 1
    }
    if (x + 1 < this.data.r && arr[x + 1][y] - arr[x][y] == d) {
      return 2
    }
    if (y - 1 >= 0 && arr[x][y - 1] - arr[x][y] == d) {
      return 3
    }
    if (y + 1 < this.data.c && arr[x][y + 1] - arr[x][y] == d) {
      return 4
    }
    return 0
  },

  printResult_2: function(arr, x, y, sx, sy) {
    if (arr[x][y] == -1) {
      return
    }
    var small_index = this.printResult_2_forward(arr, x, y, -1)
    var big_index = this.printResult_2_forward(arr, x, y, 1)
    var image_index = this.data.image_line_arr[small_index][big_index]

    if (image_index >= 0) {
      this.data.images[x][y] = this.data.image_line_srcs[image_index]
      return
    }
    var tmp = new Array()
    for (var i = 0; i < this.data.r; i++) {
      tmp[i] = new Array()
      for (var j = 0; j < this.data.c; j++) {
        tmp[i][j] = arr[i][j]
      }
    }
    console.log("printResult_2 err, ", x, y, tmp)
  },

  bindStartBlur: function() {
    this.data.start_time = (new Date()).getTime()
    this.data.cnt = 0

    // if (this.data.butVal == "重置") {
    //   this.setData({
    //     r: 0,
    //     c: 0,
    //     index_r: 0,
    //     index_c: 0,
    //     butVal: "开始计算"
    //   })
    //   this.onLoad()
    //   return
    // }

    var sx = this.data.sx - 1
    var sy = this.data.sy - 1
    var dn = 0

    var arr = new Array()
    for (var i = 0; i < this.data.r; i++) {
      arr[i] = new Array()
      for (var j = 0; j < this.data.c; j++) {
        arr[i][j] = this.data.arr[i][j]

      }
    }

    if (sx <0 || sy <0 ||sx >=this.data.r ||  sy>=this.data.c) {
      wx.showModal({
        content: "请选择起始点",
        showCancel: false
      });
      return
    }


    console.log("start", this.data.arr, sx, sy, arr)
    for (var i = 0; i < this.data.r; i++) {
      for (var j = 0; j < this.data.c; j++) {
        if (arr[i][j] == -1) {
          dn++
        }
      }
    }

    if (!this.step(arr, sx, sy, dn)) {
      console.log("NONE", arr, this.data.cnt, ", time:", (new Date()).getTime() - this.data.start_time)
      if (((new Date()).getTime() - this.data.start_time) > 10000) {
        wx.showModal({
          content: "超时",
          showCancel: false
        });
        return
      }
      wx.showModal({
        content: "无解",
        showCancel: false
      });
      return
    }

    console.log("success", this.data.cnt, ", time:", (new Date()).getTime() - this.data.start_time)

    for (var i = 0; i < this.data.r; i++) {
      for (var j = 0; j < this.data.c; j++) {
        this.printResult_2(arr, i, j, sx, sy)
      }
    }



    var images = this.data.images
    // console.log(images)
    this.setData({
      // butVal: "重置",
      images: images
    })

  }
})