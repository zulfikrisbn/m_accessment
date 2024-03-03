using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;
using Assessment.Application.Common.Mappings;
using Assessment.Application.Common.Models;
using Assessment.Application.Freelancers.Dto;

namespace Assessment.Application.Freelancers.Queries;
public class GetFreelancersWithPaginationQuery : IRequest<PaginatedList<FreelancerDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetFreelancersWithPaginationQueryHandle : IRequestHandler<GetFreelancersWithPaginationQuery, PaginatedList<FreelancerDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetFreelancersWithPaginationQueryHandle(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<FreelancerDto>> Handle(GetFreelancersWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Freelancers
            .ProjectTo<FreelancerDto>(_mapper.ConfigurationProvider)
            .AsNoTracking()
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
