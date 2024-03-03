using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;
using Assessment.Application.Common.Mappings;
using Assessment.Application.Common.Models;
using Assessment.Application.Freelancers.Dto;
using Assessment.Domain.Entities;

namespace Assessment.Application.Freelancers.Queries;
public class GetFreelancerQuery : IRequest<FreelancerDto>
{
    public int Id { get; set; } 
}

public class GetFreelancerQueryHandler : IRequestHandler<GetFreelancerQuery, FreelancerDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetFreelancerQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<FreelancerDto> Handle(GetFreelancerQuery request, CancellationToken cancellationToken)
    {
        var freelancer =  await _context.Freelancers
            .Where(x => x.Id == request.Id)
            .ProjectTo<FreelancerDto>(_mapper.ConfigurationProvider)
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        return freelancer ?? new FreelancerDto();
    }
}
