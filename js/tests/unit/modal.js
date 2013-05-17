$(function () {

    module("modal")

      test("should provide no conflict", function () {
        var modal = $.fn.modal.noConflict()
        ok(!$.fn.modal, 'modal was set back to undefined (org value)')
        $.fn.modal = modal
      })

      test("should be defined on jquery object", function () {
        var div = $("<div id='modal-test'></div>")
        ok(div.modal, 'modal method is defined')
      })

      test("should return element", function () {
        var div = $("<div id='modal-test'></div>")
        ok(div.modal() == div, 'document.body returned')
        $('#modal-test').remove()
      })

      test("should expose defaults var for settings", function () {
        ok($.fn.modal.Constructor.DEFAULTS, 'default object exposed')
      })

      test("should insert into dom when show method is called", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'></div>")
          .bind("bs:modal:shown", function () {
            ok($('#modal-test').length, 'modal insterted into dom')
            $(this).remove()
            start()
          })
          .modal("show")
      })

      test("should fire show event", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'></div>")
          .bind("bs:modal:show", function () {
            ok(true, "show was called")
          })
          .bind("bs:modal:shown", function () {
            $(this).remove()
            start()
          })
          .modal("show")
      })

      test("should not fire shown when default prevented", function () {
        stop()
        $.support.transition = false
        $("<div id='modal-test'></div>")
          .bind("bs:modal:show", function (e) {
            e.preventDefault()
            ok(true, "show was called")
            start()
          })
          .bind("bs:modal:shown", function () {
            ok(false, "shown was called")
          })
          .modal("show")
      })

      test("should hide modal when hide is called", function () {
        stop()
        $.support.transition = false

        $("<div id='modal-test'></div>")
          .bind("bs:modal:shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            $(this).modal("hide")
          })
          .bind("bs:modal:hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            $('#modal-test').remove()
            start()
          })
          .modal("show")
      })

      test("should toggle when toggle is called", function () {
        stop()
        $.support.transition = false
        var div = $("<div id='modal-test'></div>")
        div
          .bind("bs:modal:shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            div.modal("toggle")
          })
          .bind("bs:modal:hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            div.remove()
            start()
          })
          .modal("toggle")
      })

      test("should remove from dom when click [data-dismiss=modal]", function () {
        stop()
        $.support.transition = false
        var div = $("<div id='modal-test'><span class='close' data-dismiss='modal'></span></div>")
        div
          .bind("bs:modal:shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            ok($('#modal-test').length, 'modal insterted into dom')
            div.find('.close').click()
          })
          .bind("bs:modal:hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            div.remove()
            start()
          })
          .modal("toggle")
      })

      test("should allow modal close with 'backdrop:false'", function () {
        stop()
        $.support.transition = false
        var div = $("<div>", { id: 'modal-test', "data-backdrop": false })
        div
          .bind("bs:modal:shown", function () {
            ok($('#modal-test').is(":visible"), 'modal visible')
            div.modal("hide")
          })
          .bind("bs:modal:hidden", function() {
            ok(!$('#modal-test').is(":visible"), 'modal hidden')
            div.remove()
            start()
          })
          .modal("show")
      })
})
