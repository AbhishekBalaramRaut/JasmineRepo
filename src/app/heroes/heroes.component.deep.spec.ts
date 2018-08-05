import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { Hero } from "../hero";
import { HeroService} from '../hero.service';
import {NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from 'rxjs/observable/of';
import { Component, Input } from '@angular/core';
import {By } from "@angular/platform-browser";

describe(' HeroesComponent deep tests',() =>{
    let fixture :ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id:1 , name: 'SpiderDude', strength: 8},
            { id:2 , name: 'Wonderful Woman', strength: 24},
            { id:3 , name: 'SuperDude', strength: 55},
            { id:4 , name: 'SuperDude1', strength: 65}
        ] ;
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        TestBed.configureTestingModule({
            declarations : [HeroesComponent,
                            HeroComponent],
            providers:[
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as a HeroComponent', () =>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // runn ngOnit
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDes.length).toBe(4);
        for(let i=0;i < heroComponentDes.length; i++)
        {
            expect(heroComponentDes[i].componentInstance.hero).toEqual(HEROES[i])
        }
    })

    // it('should create one li for each hero', () => {
    //     mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //     fixture.detectChanges();
    //     expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    // });
});