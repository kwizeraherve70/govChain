const ProgramStats=(Programs:any)=> {

    let totalProgram = Programs.length;
    let totalEnrolled = 0;
    let totalBenefecials = 0;
    Programs.forEach((Program:any) => {
      totalEnrolled += Program.Citizens.length
      totalBenefecials += Number(Program.Beneficials)
    });
    return {
      totalProgram,
      totalEnrolled,
      totalBenefecials
    };
  }
  
  const StockStats=(Stocks: any)=>{
    let totalStock = Stocks.length;
    let totalQuantity= 0;
    let totalRemaining = 0;
    Stocks.forEach((Stock:any) => {
        totalQuantity += Number(Stock.Quantity)
        totalRemaining += Number(Stock.RemainingStock)
      
    });
    return {
        totalStock,
        totalQuantity,
        totalRemaining,
    };
  
  }

  export {
    ProgramStats,
    StockStats
  }