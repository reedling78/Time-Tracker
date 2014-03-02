define(["../../js/modules/Timer",
  "../../js/models/Project",
  'moment', 'backbone'
], function(Timer, Project, moment, backbone) {

  describe("Project", function() {

    describe("setTotal", function() {

      it("should return totalTime if no startDate is present", function() {
        var model, totalTime;

        model = new Project();
        model.set('totalTime', {d: 0,h: 1,m: 3,s: 0});
        model.setTotalTime();
        totalTime = model.get('totalTime');

        expect(totalTime.h).toBe(1);
        expect(totalTime.m).toBe(3);
        expect(totalTime.s).toBe(0);

        model = new Project();
        model.set('totalTime', {d: 3,h: 8,m: 10,s: 70});
        model.setTotalTime();
        totalTime = model.get('totalTime');
        
        expect(totalTime.h).toBe(8);
        expect(totalTime.m).toBe(11);
        expect(totalTime.s).toBe(10);

      });

      it("should return the startTime diff if no totalTime is present", function() {
        var model, totalTime;

        model = new Project();
        model.set('startTime', moment().subtract({hours: 6, minutes: 8}).toDate());
        model.setTotalTime();
        totalTime = model.get('totalTime');

        expect(totalTime.h).toBe(6);
        expect(totalTime.m).toBe(8);
        expect(totalTime.s).toBe(0);

        
        model = new Project();
        model.set('startTime', moment().subtract({minutes: 120}).toDate());
        model.setTotalTime();
        totalTime = model.get('totalTime');
        
        expect(totalTime.h).toBe(2);

      });

    });

  });
});