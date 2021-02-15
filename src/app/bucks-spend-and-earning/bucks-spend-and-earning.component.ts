import {Component, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../services/source-sink.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-bucks-spend-and-earning',
  templateUrl: './bucks-spend-and-earning.component.html',
  styleUrls: ['./bucks-spend-and-earning.component.css']
})
export class BucksSpendAndEarningComponent implements OnInit {

  legendDataforEarn = [];
  legendDataforSpend = [];
  private flagArray: any[] = [];

  constructor(private sourceSinkService: SourceSinkService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  games = [
    'dinobattlegp2012',
    'dragonbattle2012',
    'dragoncarefgp',
    // 'dragoncareios',
    'dragoncastle2012',
    'jseaattackios',
    'jsniper3dfgp',
    'jurassicseagp',
    'policevsthieffgp',
    // 'policevsthieffios',
    'seamonstergp2012',
    'sharkattackios',
    'sharkworld3dfgp'
  ];

  selectedDatabase: string | undefined;
  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  lowerLimitOfBucks = 0;
  upperLimitOfBucks = 0;
  // barChartPlugins = [ChartDataLabels];
  barChartPlugins = [];


  ngOnInit(): void {
    for(let i = 0 ; i < 50 ; i ++ ){
      this.flagArray.push(true);
    }
  }

  fetchData(): void {
    if (this.upperLimitOfBucks < this.lowerLimitOfBucks) {
      return alert(`upper limit must be greater than lower limit`);
    }
    this.sourceSinkService.getBucksSpendAndEarning(this.selectedDatabase, this.upperLimitOfBucks, this.lowerLimitOfBucks)
      .subscribe((param: any) => {
        this.isShown = true;
        this.labels = param.userLevels;
        this.datasets = [
          {
            data: param.averageEarnAfterFight,
            label: 'averageEarnAfterFight'
          },
          {
            data: param.averageEarninGoal,
            label: 'averageEarninGoal'
          },
          {
            data: param.averageEarnInAppPackChest,
            label: 'averageEarnInAppPackChest'
          },
          {
            data: param.averageEarnInAppUSD,
            label: 'averageEarnInAppUSD'
          },
          {
            data: param.averageEarnDailyBonus,
            label: 'averageEarnDailyBonus'
          },
          {
            data: param.averageEarnInAppPanel,
            label: 'averageEarnInAppPanel'
          },
          {
            data: param.averageEarninitialbuck,
            label: 'averageEarninitialbuck'
          },
          {
            data: param.averageEarnInAppSpecialOffer,
            label: 'averageEarnInAppSpecialOffer'
          },
          {
            data: param.averageEarndailyBonusProduct,
            label: 'averageEarndailyBonusProduct'
          },
          {
            data: param.averageEarnAdReward,
            label: 'averageEarnAdReward'
          },
          {
            data: param.averageEarnInApp,
            label: 'averageEarnInApp'
          },
          {
            data: param.averageEarnOwnAdReward,
            label: 'averageEarnOwnAdReward'
          },
          {
            data: param.averageEarnVideoAdReward,
            label: 'averageEarnVideoAdReward'
          },
          {
            data: param.averageEarnVIPBenefits,
            label: 'averageEarnVIPBenefits'
          },
          {
            data: param.averageEarnJump3Times,
            label: 'averageEarnJump3Times'
          },
          {
            data: param.averageEarnBestReward,
            label: 'averageEarnBestReward'
          },
          {
            data: param.averageEarnJump3Times2x,
            label: 'averageEarnJump3Times2x'
          },
          {
            data: param.averageEarnJ3TGOBestReward,
            label: 'averageEarnJ3TGOBestReward'
          },
          {
            data: param.averageEarnFightWinLooseBR,
            label: 'averageEarnFightWinLooseBR'
          },
          {
            data: param.averageEarnOwnAdVIPReward,
            label: 'averageEarnOwnAdVIPReward'
          },


          {
            data: param.averageSpendClaimWithGemsPopup,
            label: 'averageSpendClaimWithGemsPopup'
          },
          {
            data: param.averageSpendNursery,
            label: 'averageSpendNursery'
          },
          {
            data: param.averageSpendProduct,
            label: 'averageSpendProduct'
          },
          {
            data: param.averageSpendProductLand,
            label: 'averageSpendProductLand'
          },
          {
            data: param.averageSpendRefillEnergy,
            label: 'averageSpendRefillEnergy'
          },
          {
            data: param.averageSpendOuter,
            label: 'averageSpendOuter'
          },
          {
            data: param.averageSpendFarm,
            label: 'averageSpendFarm'
          },
          {
            data: param.averageSpendSummonCard,
            label: 'averageSpendSummonCard'
          },
          {
            data: param.averageSpendClaimWithGems,
            label: 'averageSpendClaimWithGems'
          },
          {
            data: param.averageSpendChallenge9Summon,
            label: 'averageSpendChallenge9Summon'
          },
          {
            data: param.averageSpendProductEvolve,
            label: 'averageSpendProductEvolve'
          },
          {
            data: param.averageSpendBreedLab,
            label: 'averageSpendBreedLab'
          },
          {
            data: param.averageSpendTodaysOffer_BuyFood,
            label: 'averageSpendTodaysOffer_BuyFood'
          },
          {
            data: param.averageSpendTodaysOffer_BuyProduct,
            label: 'averageSpendTodaysOffer_BuyProduct'
          },
          {
            data: param.averageSpendTodaysOffer_BuyAll,
            label: 'averageSpendTodaysOffer_BuyAll'
          },
          {
            data: param.averageSpendDailyBonusProduct,
            label: 'averageSpendDailyBonusProduct'
          },
          {
            data: param.averageSpendJ3TBallShop,
            label: 'averageSpendJ3TBallShop'
          },
          {
            data: param.averageSpendDailyTaskSkip,
            label: 'averageSpendDailyTaskSkip'
          }];
        const temp: any[] = [];
        this.datasets.forEach((item: any) => {
          let flag = true;
          temp.push(item);
          const precision = 0.01;
          item.data.forEach((i: number) => {
            if (Math.abs(i) >= precision) {
              flag = false;
            }
          });
          if (flag) {
            temp.pop();
          } else {
            if (item.label.includes('Earn')) {
              // @ts-ignore
              this.legendDataforEarn.push(item.label);
              item.label = item.label.slice(7, 11) + ': ' + item.label.slice(11);
            } else {
              // @ts-ignore
              this.legendDataforSpend.push(item.label);
              item.label = item.label.slice(7, 12) + ': ' + item.label.slice(12);
            }

          }
        });
        this.datasets = [];
        temp.forEach((i) => {
          this.datasets.push(i);
          this.flagArray.push(true);
        });
      });
    this.chartType = 'bar';
    this.options = {
      scaleShowValues: true,
      scaleValuePaddingX: 10,
      scaleValuePaddingY: 10,
      layout: {
        padding: {
          left: 12
        }
      },
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true,
          },
          scaleLabel: {
            display: false
          },
          stacked: true
        }],
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 90
          },
          scaleLabel: {
            display: true,
            labelString: 'level'
          },
          stacked: true
        }]
      },
      plugins: {
        datalabels: {
          // formatter: (value: any, context: any) => {
          //   if (this.flagArray[context.datasetIndex]) {
          //     this.flagArray[context.datasetIndex] = false;
          //     return 'abcd';
          //   }
          //   return '';
          //   // return context.dataset.data.labels[context.dataIndex];
          // },
          // align: 'center',
          align: (context: any) => {
            return context.datasetIndex === 0 ? 'end' : 'start';
          },
          // anchor: 'center',
          anchor: (context: any) => {
            return context.datasetIndex === 0 ? 'end' : 'start';
          },
          font: {
            weight: 'bold'
          },
          color: '#000000',
          rotation: -90
        }
      },
      legend: {
        position: 'right',
        title: {
          display: true,
          text: 'Average'
        },
        labels: {
          usePointStyle: true,
        }
      }
    };
  }
}
