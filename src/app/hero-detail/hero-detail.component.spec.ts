import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroDetailComponent }  from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService }  from '../hero.service';
import {Location} from "@angular/common";
import { of } from 'rxjs/observable/of';
import {By } from "@angular/platform-browser";
import {FormsModule} from '@angular/forms';

describe(' HeroDetailComponent deep tests',() =>{
    let fixture :ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute;
    let mockHeroService;
    let mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {paramMap : { get: () => { return '3';} } }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations : [HeroDetailComponent],
            providers:[
                {provide: HeroService, useValue: mockHeroService},
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: Location, useValue: mockLocation}
            ],
           // schemas:[NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id:3, name: 'SuperDude', strength : 6}));
    });

    it('should render  hero name in a H2 tag ', () =>{
        fixture.detectChanges();
      //  expect(fixture.debugElement.queryAll(By.css('h2'))[0].nativeElement.textContent).toContain('SUPERDUDE');
      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');

    });

    it('should call update hero when save is called ', () =>{
        mockHeroService.updatetHero.and.returnValue(of(true));
        fixture.detectChanges();
      fixture.componentInstance.save();
      setTimeout(() => {
        expect(mockHeroService.updatetHero).toHaveBeenCalled();
      },300);

    });

});