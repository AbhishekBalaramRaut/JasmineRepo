import { HeroesComponent} from "./heroes.component";
import { of } from 'rxjs/observable/of';

describe('HeroesComponent',() => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id:1 , name: 'SpiderDude', strength: 8},
            { id:2 , name: 'Wonderful Woman', strength: 24},
            { id:3 , name: 'SuperDude', strength: 56}
        ] ;

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        component = new HeroesComponent(mockHeroService);
    })

    describe('delete',() => {
        it('should remove the indicated hero from the heroes list ',() => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        })
    
        it('should call deleteHero',() => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });

    describe('add',() => {
        it('should add the indicated hero into the the heroes list ',() => {
            let name = 'Abhi';
            mockHeroService.deleteHero.and.returnValue(of(true));
            mockHeroService.addHero.and.returnValue(of({id:4,name:name,strength: 4}));
            component.heroes = HEROES;
            component.add(name);
            expect(component.heroes.length).toBe(4);
        });

    });
});