define(["../../js/modules/Timer",
        "../../js/models/Project",  
  'moment', 'backbone'], function(Timer, Project, moment, backbone) {

  describe("Timer", function() {

    it("should return an object", function() {
      expect(typeof Timer === 'object').toBe(true);
    });

    describe("elapse", function() {
      var now = new Date();;

      it("should return an function", function() {
        expect(typeof Timer.elapse === 'function').toBe(true);
      });

      it("should return base object if invalid dates", function() {
        expect(typeof Timer.elapse('', now) === 'object').toBe(true);
        expect(typeof Timer.elapse(now, '') === 'object').toBe(true);
        expect(typeof Timer.elapse(now, now) === 'object').toBe(true);
        expect(typeof Timer.elapse() === 'object').toBe(true);
      });

      it("should handle past and future dates being in reverse order",  function(){
        expect(Timer.elapse(moment().add('hours', 2).toDate(), now).h).toBe(2);
        expect(Timer.elapse(now, moment().add('hours', 2).toDate()).h).toBe(2);
      });

      it("should return diffrance in days",  function(){
        expect(Timer.elapse(now, moment().add('hours', 2).toDate()).d).toBe(0);
        expect(Timer.elapse(moment().add('days', 2).toDate(), now).d).toBe(2);
        expect(Timer.elapse(moment().add('days', 2).add('hours', 2).toDate(), now).d).toBe(2);
        expect(Timer.elapse(moment().add('days', 6).add('hours', 3).toDate(), now).d).toBe(6);
      });

      it("should return diffrance in hours",  function(){
        expect(Timer.elapse(now, moment().add('hours', 2).toDate()).h).toBe(2);
        expect(Timer.elapse(moment().add('days', 2).toDate(), now).h).toBe(0);
        expect(Timer.elapse(moment().add('days', 2).add('hours', 2).toDate(), now).h).toBe(2);
        expect(Timer.elapse(moment().add('days', 6).add('hours', 3).toDate(), now).h).toBe(3);
        expect(Timer.elapse(now, moment().add('days', 29).add('minutes', 2).toDate()).h).toBe(0);
        expect(Timer.elapse(now, moment().add('weeks', 29).add('minutes', 2).toDate()).h).toBe(0);
        expect(Timer.elapse(now, moment().add('months', 29).add('minutes', 2).toDate()).h).toBe(0);
      });

      it("should return diffrance in minutes",  function(){
        expect(Timer.elapse(now, moment().add('seconds', 2).toDate()).m).toBe(0);
        expect(Timer.elapse(now, moment().add('days', 2).toDate()).m).toBe(0);
        expect(Timer.elapse(now, moment().add('months', 2).add('minutes', 2).toDate()).m).toBe(2);
        expect(Timer.elapse(now, moment().add('minutes', 37).toDate()).m).toBe(37);
      });

      it("should return diffrance in seconds",  function(){
        expect(Timer.elapse(now, moment().add('seconds', 2).toDate()).s).toBe(2);
        expect(Timer.elapse(now, moment().add('seconds', 70).toDate()).s).toBe(10);
        expect(Timer.elapse(now, moment().add('seconds', 400).toDate()).s).toBe(40);
        expect(Timer.elapse(now, moment().add('milliseconds', 3999).toDate()).m).toBe(0);
        expect(Timer.elapse(now, moment().add('months', 2).add('minutes', 2).toDate()).m).toBe(2);
      });

    });
  });
  

});